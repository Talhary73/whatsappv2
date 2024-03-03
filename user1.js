const CredsModel = require('./mongo/model/creds')
const owner = ["923101502365"];
const QRCode = require('qrcode')
const {
  default: sansekaiConnect,
  useMultiFileAuthState,

  fetchLatestBaileysVersion,

  makeInMemoryStore, makeCacheableSignalKeyStore

} = require("@whiskeysockets/baileys");
const Connect = require('./mongo/index')

const func = async(name)=>{
 await Connect()

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




const color = (text, color) => {
  return !color ? chalk.green(text) : chalk.keyword(color)(text);
};



async function startHisoka() {
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`using WA v${version.join(".")}, isLatest: ${isLatest}`);
  console.log(
    color(
      figlet.textSync("Talha", {
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





  //  console.log()
   // console.log(saveCreds)

 client.ev.on("connection.update", async (update) => {
  
 
  if(update.qr) {
    const image = await QRCode.toDataURL(update.qr)
    const base64Image = image.replace(/^data:image\/png;base64,/, '');
   fs.writeFileSync('./public/image.png', base64Image, 'base64');
  }
 
  const { connection, lastDisconnect } = update;
  console.log(connection,lastDisconnect)
   
  });

  client.ev.on("creds.update", saveCreds);



  return client;
}

startHisoka();



}

     func('Talha').then(res=>console.log(res))
