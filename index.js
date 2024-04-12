const sessionName = "Talha";
const owner = ["923101502365"];
const QRCode = require("qrcode");
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
  makeWASocket,
  makeCacheableSignalKeyStore,
} = require("@whiskeysockets/baileys");
// require('./ws.js')
const connect = require("./mongo/index");
const CredsModels = require("./mongo/model/creds");
const express = require("express");
const path = require("path");
const app = express();

require("dotenv").config();
const port = process.env.PORT || 3551;
const AllowedUsers = require("./mongo/model/allowed");
// Middleware to calculate and log the current URL
// app.use((req, res, next) => {
//   const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
//   console.log('Current URL:', fullUrl);
//   setTimeout(async ()=>{
//    try {
//     await axios.get(`${req.protocol}://${req.get('host')}`)
//    } catch (error) {
//     console.log(' error ')
//    }
//   console.log('sended')
// },20000)
//   next(); // Move to the next middleware or route handler
// });
//  setInterval(async ()=>{
//    try {
//     await axios.get(`https://whatsapp-bot-new-bot-65c6e4e95b06.herokuapp.com/`)
//    } catch (error) {
//     console.log(' error ')
//    }

// },20000)
// Static file middleware
app.use(express.static("./public"));
app.use(express.json());
app.get("/check", (req, res) => {
  res.json({ res: "hi, I am a bot" }).status(200);
});
app.get("/files/:id", (req, res) => {
  const { id } = req.params;
  res.sendFile(path.join(__dirname, `./files/${id}`));
});

app.post("/api/v1/creds/remove", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res
        .json({ status: "failed", data: "Please provide number" })
        .status(400);
    await CredsModels.deleteOne({ _id: name });
    res.json({ status: "success", data: req.body });
  } catch (error) {
    res.json({ status: "failed" }).status(500);
  }
});
app.get("/api/v1/creds/users", async (req, res) => {
  try {
    const Users = await CredsModels.find({});
    //  console.log(Users)
    res.json({ Users, status: "success" });
  } catch (error) {
    res.json({ status: "failed" }).status(500);
  }
});
// app.post('/api/v1/creds/login',async (req,res)=>{
//   // console.log(req.body)
//   const {number} = req.body;
//    const id = '92'+ number.substr(1) + '@s.whatsapp.net'
//   // await AllowedUsers.create({id:})
//   if(!number){
//     return   res.json({status:'failed',data:'Please write number'}).status(400)

//   }
//   await AllowedUsers.create({id:id})
//   res.json({status:'success',data:id}).status(201)
// })

app.post("/api/v1/remove", async (req, res) => {
  try {
    const { number } = req.body;
    if (!number)
      return res
        .json({ status: "failed", data: "Please provide number" })
        .status(400);
    await AllowedUsers.deleteOne({ id: number });
    res.json({ status: "success", data: req.body });
  } catch (error) {
    res.json({ status: "failed" }).status(500);
  }
});
app.get("/api/v1/users", async (req, res) => {
  try {
    const Users = await AllowedUsers.find({});
    //  console.log(Users)
    res.json({ Users, status: "success" });
  } catch (error) {
    res.json({ status: "failed" }).status(500);
  }
});
app.post("/api/v1/login", async (req, res) => {
  // console.log(req.body)
  const { number } = req.body;
  const id = "92" + number.substr(1) + "@s.whatsapp.net";
  // await AllowedUsers.create({id:})
  if (!number) {
    return res
      .json({ status: "failed", data: "Please write number" })
      .status(400);
  }
  await AllowedUsers.create({ id: id });
  res.json({ status: "success", data: id }).status(201);
});
app.use((err, req, res, next) => {
  console.log("Express Error;");
  console.log(err);
  res.send({ status: "failed", data: err.message }).status(500);
});
const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
require("./ws.js")(server);
const axios = require("axios");

setInterval(async () => {
  try {
    await axios.get(process.env.URL);
  } catch (error) {}
}, 20000);
setInterval(async () => {
  try {
    require("./testnew.js")();
  } catch (error) {}
}, 61000);
const func = async () => {
  const FileType = await import("file-type");

  const pino = require("pino");
  const { Boom } = require("@hapi/boom");
  const fs = require("fs");
  const axios = require("axios");
  const chalk = require("chalk");
  const figlet = require("figlet");
  const _ = require("lodash");
  const PhoneNumber = require("awesome-phonenumber");
  const logger = pino().child({ level: "silent", stream: "store" });

  // const users = await CredsModels.find({});
  const obj = {
    name: "Talh2a",
    creds: JSON.parse(
      fs.readFileSync("./Configs/Talh2a/creds.json", { encoding: "utf-8" })
    ),
  };
  console.log(obj);
  const users = [obj];

  // console.log(users.length);
  // console.log(users);
  // const users = [{ name: "Talha", creds: "" }];

  for (user of users) {
    if (!fs.existsSync("./Configs")) fs.mkdirSync("./Configs");
    if (!fs.existsSync("./Configs/" + user.name))
      fs.mkdirSync("./Configs/" + user.name);
    if (!fs.existsSync("./Configs/" + user.name + "./creds.json")) {
      fs.writeFileSync(
        "./Configs/" + user.name + "/creds.json",
        JSON.stringify(user.creds)
      );
    }

    // require('./void.js')
    const { state, saveCreds } = await useMultiFileAuthState(
      "./Configs/" + user.name
    );
    const saveState = saveCreds;
    // const store = makeWASocket({
    //         printQRInTerminal: true ,
    //         logger,
    //         auth: {
    // 			creds: state.creds,
    // 			/** caching makes the store faster to send/recv messages */
    // 			keys: makeCacheableSignalKeyStore(state.keys, logger),
    // 		}});
    const store = makeInMemoryStore({
      auth: {
        creds: state.creds,
        /** caching makes the store faster to send/recv messages */
        keys: makeCacheableSignalKeyStore(state.keys, logger),
      },
      logger: pino().child({ level: "silent", stream: "store" }),
    });

    const color = (text, color) => {
      return !color ? chalk.green(text) : chalk.keyword(color)(text);
    };

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
            ? m.message[m.mtype].message[
                getContentType(m.message[m.mtype].message)
              ]
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
        m.mentionedJid = m.msg.contextInfo
          ? m.msg.contextInfo.mentionedJid
          : [];
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

    async function startHisoka(userId) {
      // console.log(userId)
      const { version, isLatest } = await fetchLatestBaileysVersion();
      console.log(`using WA v${version.join(".")}, isLatest: ${isLatest}`);
      console.log(
        color(
          figlet.textSync(userId?.name || "TALHA", {
            font: "Standard",
            horizontalLayout: "default",
            vertivalLayout: "default",
            whitespaceBreak: false,
          }),
          "green"
        )
      );

      const client = sansekaiConnect({
        logger: pino({ level: "silent" }),
        printQRInTerminal: true,
        browser: ["Wa-OpenAI - Talha", "Safari", "3.0"],
        auth: state,
      });

      store.bind(client.ev);

      client.ev.on("messages.upsert", async (chatUpdate) => {
        // console.log(chatUpdate)
        //console.log(JSON.stringify(chatUpdate, undefined, 2))
        try {
          mek = chatUpdate.messages[0];
          if (!mek.message) return;
          mek.message =
            Object.keys(mek.message)[0] === "ephemeralMessage"
              ? mek.message.ephemeralMessage.message
              : mek.message;
          if (mek.key && mek.key.remoteJid === "status@broadcast") return;
          if (!client.public && !mek.key.fromMe && chatUpdate.type === "notify")
            return;
          if (mek.key.id.startsWith("BAE5") && mek.key.id.length === 16) return;

          m = smsg(client, mek, store);

          require("./main")(client, m, chatUpdate, store, userId);
        } catch (err) {
          console.log(err);
        }
      });

      // Handle error
      const unhandledRejections = new Map();
      process.on("unhandledRejection", (reason, promise) => {
        unhandledRejections.set(promise, reason);
        console.log("Unhandled Rejection at:", promise, "reason:", reason);
      });
      process.on("rejectionHandled", (promise) => {
        unhandledRejections.delete(promise);
      });
      process.on("Something went wrong", function (err) {
        console.log("Caught exception: ", err);
      });

      // Setting
      client.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
          let decode = jidDecode(jid) || {};
          return (
            (decode.user &&
              decode.server &&
              decode.user + "@" + decode.server) ||
            jid
          );
        } else return jid;
      };

      client.ev.on("contacts.update", (update) => {
        for (let contact of update) {
          let id = client.decodeJid(contact.id);
          if (store && store.contacts)
            store.contacts[id] = { id, name: contact.notify };
        }
      });

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

      client.setStatus = (status) => {
        client.query({
          tag: "iq",
          attrs: {
            to: "@s.whatsapp.net",
            type: "set",
            xmlns: "status",
          },
          content: [
            {
              tag: "status",
              attrs: {},
              content: Buffer.from(status, "utf-8"),
            },
          ],
        });
        return status;
      };

      client.public = true;

      client.serializeM = (m) => smsg(client, m, store);
      let user = "";

      client.ev.on("connection.update", async (update) => {
        if (update.qr) {
          const image = await QRCode.toDataURL(update.qr);
          const base64Image = image.replace(/^data:image\/png;base64,/, "");
          fs.writeFileSync("./public/image.png", base64Image, "base64");
        }

        const { connection, lastDisconnect } = update;

        if (connection === "close") {
          let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
          if (reason === DisconnectReason.badSession) {
            if (user)
              user.send(
                `Bad Session File, Please Delete Session and Scan Again`
              );
            console.log(
              `Bad Session File, Please Delete Session and Scan Again`
            );
          } else if (reason === DisconnectReason.connectionClosed) {
            if (user) user.send(`Connection closed, reconnecting....`);
            console.log("Connection closed, reconnecting....");
            startHisoka();
          } else if (reason === DisconnectReason.connectionLost) {
            if (user) user.send("Connection Lost from Server, reconnecting...");
            console.log("Connection Lost from Server, reconnecting...");
            startHisoka();
          } else if (reason === DisconnectReason.connectionReplaced) {
            if (user)
              user.send(
                "Connection Replaced, Another New Session Opened, Please Close Current Session First"
              );
            console.log(
              "Connection Replaced, Another New Session Opened, Please Close Current Session First"
            );
          } else if (reason === DisconnectReason.loggedOut) {
            if (user) {
              user.send(
                "Device Logged Out, Please Delete Session file Talha.json and Scan Again."
              );
            }
            console.log(
              `Device Logged Out, Please Delete Session file Talha.json and Scan Again.`
            );
            await CredsModels.deleteOne({ _id: userId._id });
          } else if (reason === DisconnectReason.restartRequired) {
            if (user) {
              user.send("Restart Required, Restarting...");
            }
            console.log("Restart Required, Restarting...");
            startHisoka(userId);
          } else if (reason === DisconnectReason.timedOut) {
            if (user) user.send("Connection TimedOut, Reconnecting...");
            console.log("Connection TimedOut, Reconnecting...");
            startHisoka();
          } else {
            if (user)
              user.send(`Unknown DisconnectReason: ${reason}|${connection}`);
            console.log(`Unknown DisconnectReason: ${reason}|${connection}`);

            // startHisoka();
          }
        } else if (connection === "open") {
          console.log(color("Bot success conneted to server", "green"));
          console.log(color("Type /menu to see menu"));
          client.sendMessage(owner + "@s.whatsapp.net", {
            text: `Bot Start ho Chuka ha )\n`,
          });
        }
        // console.log('Connected...', update)
      });

      client.ev.on("creds.update", saveState);

      const getBuffer = async (url, options) => {
        try {
          options ? options : {};
          const res = await axios({
            method: "get",
            url,
            headers: {
              DNT: 1,
              "Upgrade-Insecure-Request": 1,
            },
            ...options,
            responseType: "arraybuffer",
          });
          return res.data;
        } catch (err) {
          return err;
        }
      };

      client.sendImage = async (
        jid,
        path,
        caption = "",
        quoted = "",
        options
      ) => {
        let buffer = Buffer.isBuffer(path)
          ? path
          : /^data:.*?\/.*?;base64,/i.test(path)
          ? Buffer.from(path.split`,`[1], "base64")
          : /^https?:\/\//.test(path)
          ? await await getBuffer(path)
          : fs.existsSync(path)
          ? fs.readFileSync(path)
          : Buffer.alloc(0);
        return await client.sendMessage(
          jid,
          { image: buffer, caption: caption, ...options },
          { quoted }
        );
      };
      client.downloadAndSaveMediaMessage = async (
        message,
        filename,
        attachExtension = true
      ) => {
        let quoted = message.msg ? message.msg : message;
        let mime = (message.msg || message).mimetype || "";
        let messageType = message.mtype
          ? message.mtype.replace(/Message/gi, "")
          : mime.split("/")[0];
        const stream = await downloadContentFromMessage(quoted, messageType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        let type = await FileType.fileTypeFromBuffer(buffer);
        trueFileName = attachExtension ? filename + "." + type.ext : filename;
        // save to file
        await fs.writeFileSync(trueFileName, buffer);
        return trueFileName;
      };
      //========================================================================================================================================
      client.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || "";
        let messageType = message.mtype
          ? message.mtype.replace(/Message/gi, "")
          : mime.split("/")[0];
        const stream = await downloadContentFromMessage(message, messageType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }

        return buffer;
      };
      client.sendText = (jid, text, quoted = "", options) =>
        client.sendMessage(jid, { text: text, ...options }, { quoted });

      client.cMod = (
        jid,
        copy,
        text = "",
        sender = client.user.id,
        options = {}
      ) => {
        //let copy = message.toJSON()
        let mtype = Object.keys(copy.message)[0];
        let isEphemeral = mtype === "ephemeralMessage";
        if (isEphemeral) {
          mtype = Object.keys(copy.message.ephemeralMessage.message)[0];
        }
        let msg = isEphemeral
          ? copy.message.ephemeralMessage.message
          : copy.message;
        let content = msg[mtype];
        if (typeof content === "string") msg[mtype] = text || content;
        else if (content.caption) content.caption = text || content.caption;
        else if (content.text) content.text = text || content.text;
        if (typeof content !== "string")
          msg[mtype] = {
            ...content,
            ...options,
          };
        if (copy.key.participant)
          sender = copy.key.participant = sender || copy.key.participant;
        else if (copy.key.participant)
          sender = copy.key.participant = sender || copy.key.participant;
        if (copy.key.remoteJid.includes("@s.whatsapp.net"))
          sender = sender || copy.key.remoteJid;
        else if (copy.key.remoteJid.includes("@broadcast"))
          sender = sender || copy.key.remoteJid;
        copy.key.remoteJid = jid;
        copy.key.fromMe = sender === client.user.id;

        return proto.WebMessageInfo.fromObject(copy);
      };

      return client;
    }

    startHisoka(user);

    let file = require.resolve(__filename);
    fs.watchFile(file, () => {
      fs.unwatchFile(file);
      console.log(chalk.redBright(`Update ${__filename}`));
      delete require.cache[file];
      require(file);
    });
  }
};
const start = async () => {
  try {
    await connect();
    console.log("conencted to DB");
    func();
  } catch (err) {
    console.log(err);
  }
};
start();
