const CredsModel = require('./mongo/model/creds')
const owner = ["923101502365"];
const QRCode = require('qrcode')
const {
  default: sansekaiConnect,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,

  makeInMemoryStore, makeCacheableSignalKeyStore

} = require("@whiskeysockets/baileys");
const Connect = require('./mongo/index')

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
      await CredsModel.create({name:name,creds:JSON.parse(fs.readFileSync('./Path/'+name+'/creds.json',{encoding:'utf-8'}))})
      fs.unlinkSync('./Path/'+name+'/creds.json')
      
      socket.to(id).emit('add','Saved DONE')
      return
    }
    // console.log('Connected...', update)
  });

  client.ev.on("creds.update", saveCreds);



  return client;
}

startHisoka();



}
module.exports = func

    //  func('TalhaNew').then(res=>console.log(res))
