

const { Client } = require('@whiskeysockets/baileys');

const client = new Client();

client.on('qr', (qr) => {
  console.log('QR Code:', qr);
});

client.on('login', (session) => {
  console.log('Logged in!');

  client.sendPresenceUpdate('typing');

  setTimeout(() => {
    client.sendPresenceUpdate('available');
  }, 3000);
});



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

import { Boom } from '@hapi/boom';
import NodeCache from 'node-cache';
import readline from 'readline';
import makeWASocket, { AnyMessageContent, delay, DisconnectReason, fetchLatestBaileysVersion, getAggregateVotesInPollMessage, makeCacheableSignalKeyStore, makeInMemoryStore, PHONENUMBER_MCC, proto, useMultiFileAuthState, WAMessageContent, WAMessageKey } from '../src';
import MAIN_LOGGER from '../src/Utils/logger';
import open from 'open';
import fs from 'fs';

const logger = MAIN_LOGGER.child({});
logger.level = 'trace';

const useStore = !process.argv.includes('--no-store');
const doReplies = !process.argv.includes('--no-reply');
const usePairingCode = process.argv.includes('--use-pairing-code');
const useMobile = process.argv.includes('--mobile');

const msgRetryCounterCache = new NodeCache();

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

const store = useStore ? makeInMemoryStore({ logger }) : undefined;
store?.readFromFile('./baileys_store_multi.json');
setInterval(() => {
  store?.writeToFile('./baileys_store_multi.json');
}, 10_000);

const startSock = async () => {
  const { state, saveCreds } = await useMultiFileAuthState('baileys_auth_info');
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`);

  const sock = makeWASocket({
    version,
    logger,
    printQRInTerminal: !usePairingCode,
    mobile: useMobile,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
    msgRetryCounterCache,
    generateHighQualityLinkPreview: true,
    getMessage,
  });

  store?.bind(sock.ev);

  if (usePairingCode && !sock.authState.creds.registered) {
    if (useMobile) {
      throw new Error('Cannot use pairing code with mobile api');
    }

    const phoneNumber = await question('Please enter your mobile phone number:\n');
    const code = await sock.requestPairingCode(phoneNumber);
    console.log(`Pairing code: ${code}`);
  }

  if (useMobile && !sock.authState.creds.registered) {
    const { registration } = sock.authState.creds || { registration: {} };

    if (!registration.phoneNumber) {
      registration.phoneNumber = await question('Please enter your mobile phone number:\n');
    }

    const libPhonenumber = await import("libphonenumber-js");
    const phoneNumber = libPhonenumber.parsePhoneNumber(registration.phoneNumber);
    if (!phoneNumber?.isValid()) {
      throw new Error('Invalid phone number: ' + registration.phoneNumber);
    }

    registration.phoneNumber = phoneNumber.format('E.164');
    registration.phoneNumberCountryCode = phoneNumber.countryCallingCode;
    registration.phoneNumberNationalNumber = phoneNumber.nationalNumber;
    const mcc = PHONENUMBER_MCC[phoneNumber.countryCallingCode];
    if (!mcc) {
      throw new Error('Could not find MCC for phone number: ' + registration.phoneNumber + '\nPlease specify the MCC manually.');
    }

    registration.phoneNumberMobileCountryCode = mcc;

    async function enterCode() {
      try {
        const code = await question('Please enter the one-time code:\n');
        const response = await sock.register(code.replace(/["']/g, '').trim().toLowerCase());
        console.log('Successfully registered your phone number.');
        console.log(response);
        rl.close();
      } catch (error) {
        console.error('Failed to register your phone number. Please try again.\n', error);
        await askForOTP();
      }
    }

    async function enterCaptcha() {
      const response = await sock.requestRegistrationCode({ ...registration, method: 'captcha' });
      const path = __dirname + '/captcha.png';
      fs.writeFileSync(path, Buffer.from(response.image_blob, 'base64'));

      open(path);
      const code = await question('Please enter the captcha code:\n');
      fs.unlinkSync(path);
      registration.captcha = code.replace(/["']/g, '').trim().toLowerCase();
    }

    async function askForOTP() {
      if (!registration.method) {
        let code = await question('How would you like to receive the one-time code for registration? "sms" or "voice"\n');
        code = code.replace(/["']/g, '').trim().toLowerCase();
        if (code !== 'sms' && code !== 'voice') {
          return await askForOTP();
        }

        registration.method = code;
      }

      try {
        await sock.requestRegistrationCode(registration);
        await enterCode();
      } catch (error) {
        console.error('Failed to request registration code. Please try again.\n', error);

        if (error?.reason === 'code_checkpoint') {
          await enterCaptcha();
        }

        await askForOTP();
      }
    }

    askForOTP();
  }

  const sendMessageWTyping = async (msg, jid) => {
    await sock.presenceSubscribe(jid);
    await delay(500);

    await sock.sendPresenceUpdate('composing', jid);
    await delay(2000);

    await sock.sendPresenceUpdate('paused', jid);

    await sock.sendMessage(jid, msg);
  };

  sock.ev.process(async (events) => {
    if (events['connection.update']) {
      const update = events['connection.update'];
      const { connection, lastDisconnect } = update;
      if (connection === 'close') {
        if ((lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut) {
          startSock();
        } else {
          console.log('Connection closed. You are logged out.');
        }
      }

      console.log('connection update', update);
    }

    if (events['creds.update']) {
      await saveCreds();
    }

    if (events['labels.association']) {
      console.log(events['labels.association']);
    }

    if (events['labels.edit']) {
      console.log(events['labels.edit']);
    }

    if (events.call) {
      console.log('recv call event', events.call);
    }

    if (events['messaging-history.set']) {
      const { chats, contacts, messages, isLatest } = events['messaging-history.set'];
      console.log(`recv ${chats.length} chats, ${contacts.length} contacts, ${messages.length} msgs (is latest: ${isLatest})`);
    }

    if (events['messages.upsert']) {
      const upsert = events['messages.upsert'];
      console.log('recv messages ', JSON.stringify(upsert, undefined, 2));

      if (upsert.type === 'notify') {
        for (const msg of upsert.messages) {
          if (!msg.key.fromMe && doReplies) {
            console.log('replying to', msg.key.remoteJid);
            await sock.readMessages([msg.key]);
            await sendMessageWTyping({ text: 'Hello there!' }, msg.key.remoteJid);
          }
        }
      }
    }

    if (events['messages.update']) {
      console.log(
        JSON.stringify(events['messages.update'], undefined, 2)
      );

      for (const { key, update } of events['messages.update']) {
        if (update.pollUpdates) {
          const pollCreation = await getMessage(key);
          if (pollCreation) {
            console.log(
              'got poll update, aggregation: ',
              getAggregateVotesInPollMessage({
                message: pollCreation,
                pollUpdates: update.pollUpdates,
              })
            );
          }
        }
      }
    }

    if (events['message-receipt.update']) {
      console.log(events['message-receipt.update']);
    }

    if (events['messages.reaction']) {
      console.log(events['messages.reaction']);
    }

    if (events['presence.update']) {
      console.log(events['presence.update']);
    }

    if (events['chats.update']) {
      console.log(events['chats.update']);
    }

    if (events['contacts.update']) {
      for (const contact of events['contacts.update']) {
        if (typeof contact.imgUrl !== 'undefined') {
          const newUrl = contact.imgUrl === null
            ? null
            : await sock.profilePictureUrl(contact.id).catch(() => null);
          console.log(
            `contact ${contact.id} has a new profile pic: ${newUrl}`,
          );
        }
      }
    }

    if (events['chats.delete']) {
      console.log('chats deleted ', events['chats.delete']);
    }
  });

  return sock;

  async function getMessage(key) {
    if (store) {
      const msg = await store.loadMessage(key.remoteJid, key.id);
      return msg?.message || undefined;
    }

    return proto.Message.fromObject({});
  }
}

startSock();

