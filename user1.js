const CredsModel = require('./mongo/model/creds')
const owner = ["923101502365"];
// const { exec } = require('child_process');
const QRCode = require('qrcode')
const {
 default: sansekaiConnect,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  generateForwardMessageContent,
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  generateMessageID,
  downloadContentFromMessage,
  makeInMemoryStore,
  jidDecode,
  proto,
  getContentType,
  makeWASocket
  , makeCacheableSignalKeyStore
} = require("@whiskeysockets/baileys");
const Connect = require('./mongo/index')
const start = require('./index.js');
const activate = require('./activate-user.js');
const func = async(name, socket,id)=>{
 await Connect()
 console.log("this is id"+id)
 socket.to(id).emit('add', 'Scan it')
 const FileType = await import('file-type')

const pino = require("pino");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const axios = require("axios");
const chalk = require("chalk");
const figlet = require("figlet");
const _ = require("lodash");
const PhoneNumber = require("awesome-phonenumber");
const logger = pino().child({ level: "silent", stream: "store" })



function smsg(conn, m, store) {
  if (!m) return m;
  let M = proto.WebMessageInfo;
  if (m.key) {
    m.id = m.key.id;
    m.isBaileys = m.id.startsWith("BAE5") && m.id.length === 16;
    m.chat = m.key.remoteJid;
    m.fromMe = m.key.fromMe;
    m.isGroup = m.chat.endsWith("@g.us");
    m.sender = conn.decodeJid(
      (m.fromMe && conn.user.id) ||
        m.participant ||
        m.key.participant ||
        m.chat ||
        ""
    );
    if (m.isGroup) m.participant = conn.decodeJid(m.key.participant) || "";
  }
  if (m.message) {
    m.mtype = getContentType(m.message);
    m.msg =
      m.mtype == "viewOnceMessage"
        ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)]
        : m.message[m.mtype];
    m.body =
      m.message.conversation ||
      m.msg.caption ||
      m.msg.text ||
      (m.mtype == "listResponseMessage" &&
        m.msg.singleSelectReply.selectedRowId) ||
      (m.mtype == "buttonsResponseMessage" && m.msg.selectedButtonId) ||
      (m.mtype == "viewOnceMessage" && m.msg.caption) ||
      m.text;
    let quoted = (m.quoted = m.msg.contextInfo
      ? m.msg.contextInfo.quotedMessage
      : null);
    m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : [];
    if (m.quoted) {
      let type = getContentType(quoted);
      m.quoted = m.quoted[type];
      if (["productMessage"].includes(type)) {
        type = getContentType(m.quoted);
        m.quoted = m.quoted[type];
      }
      if (typeof m.quoted === "string")
        m.quoted = {
          text: m.quoted,
        };
      m.quoted.mtype = type;
      m.quoted.id = m.msg.contextInfo.stanzaId;
      m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat;
      m.quoted.isBaileys = m.quoted.id
        ? m.quoted.id.startsWith("BAE5") && m.quoted.id.length === 16
        : false;
      m.quoted.sender = conn.decodeJid(m.msg.contextInfo.participant);
      m.quoted.fromMe = m.quoted.sender === conn.decodeJid(conn.user.id);
      m.quoted.text =
        m.quoted.text ||
        m.quoted.caption ||
        m.quoted.conversation ||
        m.quoted.contentText ||
        m.quoted.selectedDisplayText ||
        m.quoted.title ||
        "";
      m.quoted.mentionedJid = m.msg.contextInfo
        ? m.msg.contextInfo.mentionedJid
        : [];
      m.getQuotedObj = m.getQuotedMessage = async () => {
        if (!m.quoted.id) return false;
        let q = await store.loadMessage(m.chat, m.quoted.id, conn);
        return exports.smsg(conn, q, store);
      };
      let vM = (m.quoted.fakeObj = M.fromObject({
        key: {
          remoteJid: m.quoted.chat,
          fromMe: m.quoted.fromMe,
          id: m.quoted.id,
        },
        message: quoted,
        ...(m.isGroup ? { participant: m.quoted.sender } : {}),
      }));

      /**
       *
       * @returns
       */
      m.quoted.delete = () =>
        conn.sendMessage(m.quoted.chat, { delete: vM.key });

      /**
       *
       * @param {*} jid
       * @param {*} forceForward
       * @param {*} options
       * @returns
       */
      m.quoted.copyNForward = (jid, forceForward = false, options = {}) =>
        conn.copyNForward(jid, vM, forceForward, options);

      /**
       *
       * @returns
       */
      m.quoted.download = () => conn.downloadMediaMessage(m.quoted);
    }
  }
  if (m.msg.url) m.download = () => conn.downloadMediaMessage(m.msg);
  m.text =
    m.msg.text ||
    m.msg.caption ||
    m.message.conversation ||
    m.msg.contentText ||
    m.msg.selectedDisplayText ||
    m.msg.title ||
    "";
  /**
   * Reply to this message
   * @param {String|Object} text
   * @param {String|false} chatId
   * @param {Object} options
   */
  m.reply = (text, chatId = m.chat, options = {}) =>
    Buffer.isBuffer(text)
      ? conn.sendMedia(chatId, text, "file", "", m, { ...options })
      : conn.sendText(chatId, text, m, { ...options });
  /**
   * Copy this message
   */
  m.copy = () => exports.smsg(conn, M.fromObject(M.toObject(m)));

  /**
   *
   * @param {*} jid
   * @param {*} forceForward
   * @param {*} options
   * @returns
   */
  m.copyNForward = (jid = m.chat, forceForward = false, options = {}) =>
    conn.copyNForward(jid, m, forceForward, options);

  return m;
}
const color = (text, color) => {
  return !color ? chalk.green(text) : chalk.keyword(color)(text);
};



async function startHisoka() {
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`using WA v${version.join(".")}, isLatest: ${isLatest}`);
  console.log(
    color(
      figlet.textSync(name, {
        font: "Standard",
        horizontalLayout: "default",
        vertivalLayout: "default",
        whitespaceBreak: false,
      }),
      "green"
    )
  );

const { state,  saveCreds } = await useMultiFileAuthState('Path/'+name)
const store = makeInMemoryStore({
  auth: {
			creds: state.creds,
			/** caching makes the store faster to send/recv messages */
			keys: makeCacheableSignalKeyStore(state.keys, logger),
		},
  logger: pino().child({ level: "silent", stream: "store" }),
});


  const client = sansekaiConnect({
    logger: pino({ level: "silent" }),
    printQRInTerminal: true,
    browser: ["Wa-OpenAI - Talha", "Safari", "3.0"],
    auth: state,
  });

  store.bind(client.ev); 


client.getName = (jid, withoutContact = false) => {
    id = client.decodeJid(jid);
    withoutContact = client.withoutContact || withoutContact;
    let v;
    if (id.endsWith("@g.us"))
      return new Promise(async (resolve) => {
        v = store.contacts[id] || {};
        if (!(v.name || v.subject)) v = client.groupMetadata(id) || {};
        resolve(
          v.name ||
            v.subject ||
            PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber(
              "international"
            )
        );
      });
    else
      v =
        id === "0@s.whatsapp.net"
          ? {
              id,
              name: "WhatsApp",
            }
          : id === client.decodeJid(client.user.id)
          ? client.user
          : store.contacts[id] || {};
    return (
      (withoutContact ? "" : v.name) ||
      v.subject ||
      v.verifiedName ||
      PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber(
        "international"
      )
    );
  };


  //  console.log()
   // console.log(saveCreds)

 client.ev.on("connection.update", async (update) => {
  
 
  if(update.qr) {
    const image = await QRCode.toDataURL(update.qr)
    const base64Image = image.replace(/^data:image\/png;base64,/, '');
    socket.to(id).emit('photo',base64Image)
    socket.to(id).emit('add','For user ' + name)

   fs.writeFileSync('./public/image.png', base64Image, 'base64');
  }
 
    const { connection, lastDisconnect } = update;

    

    if (connection === "close") {
     let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (reason === DisconnectReason.badSession) {
      
        console.log(`Bad Session File, Please Delete Session and Scan Again`);
        socket.to(id).emit('add','Error try agaain')
        return
      } else if (reason === DisconnectReason.connectionClosed) {
     
        console.log("Connection closed, reconnecting....");
        // startHisoka();

        return
      } else if (reason === DisconnectReason.connectionLost) {
    
        console.log("Connection Lost from Server, reconnecting...");
        // startHisoka();
        socket.to(id).emit('add','Error try agaain')
       return
      } else if (reason === DisconnectReason.connectionReplaced) {
     
        console.log(
          "Connection Replaced, Another New Session Opened, Please Close Current Session First"
        );
      socket.to(id).emit('done','Error try again')
       return
      } else if (reason === DisconnectReason.loggedOut) {
      
        console.log(
          `Device Logged Out, Please Delete Session file Talha.json and Scan Again.`
        );
        socket.to(id).emit('done','Error')
        return
      } else if (reason === DisconnectReason.restartRequired) {
       
        console.log("Restart Required, Restarting...");
        socket.to(id).emit('add','Please Wait restarting...')
        // return 
        startHisoka();
      } else if (reason === DisconnectReason.timedOut) {
      
        console.log("Connection TimedOut, Reconnecting...");
        // startHisoka();
        socket.to(id).emit('add','Error try agaain')
       return
      } else {
     
        console.log(`Unknown DisconnectReason: ${reason}|${connection}`);
        // startHisoka();
        socket.to(id).emit('add','Error try agaain')
        return
      }
    } else if (connection === "open") {
      console.log(color("Bot success conneted to server", "green"));
      console.log(color("Type /menu to see menu"));
      client.sendMessage(owner + "@s.whatsapp.net", {
        text: `Bot Start ho Chuka ha )\n`,
      });
    

        // fs.unlinkSync('./Path/'+name+'/creds.json')

         
      socket.to(id).emit('add','Session Added please wait for verification')
      // return
    }
    // console.log('Connected...', update)
  });

  client.ev.on("creds.update", saveCreds);
  
  client.ev.on("messages.upsert", async (chatUpdate) => {
   
    socket.to(id).emit('add','Session Added please wait for 10 seconds')
    
    setTimeout(async() => {
         const res =  await CredsModel.findOne({name:name});
          if(res) return 
         const creds =  await CredsModel.create({name:name,creds:JSON.parse(fs.readFileSync('./Path/'+name+'/creds.json',{encoding:'utf-8'}))})
         socket.to(id).emit('add','Session Secured. Now your bot should be running.')
         socket.to(id).emit('add','Head back to this link in order to activate User if bot is not running '+process.env.URL +'/api/v1/creds/activate/'+creds._id)

         console.log(creds)
         activate(creds)
        //  setTimeout(restartNodeProcess, 1000);
        // await start()
        //  return start();
    }, 20000);
   
    //console.log(JSON.stringify(chatUpdate, undefined, 2))

  });
   
  // return client;
}

startHisoka();



}
module.exports = func

    //  func('TalhaNew').then(res=>console.log(res))
