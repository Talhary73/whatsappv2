const { BufferJSON, downloadMediaMessage, WA_DEFAULT_EPHEMERAL, makeWASocket, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType, MessageType, MessageOptions, Mimetype } = require('@whiskeysockets/baileys')
const { isUri } = require('./lib/my-func')
const wa = require('@whiskeysockets/baileys')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const { jsPDF } = require("jspdf");
const sendFileFromExtension = require('./lib/sendfileusingextension')
const downloadv1 = require('./lib/downloadv1.js')
const imgfromMJ = require('./lib/img.js')
const whoidData = require('./lib/whoistodata')
const ttsv1 = require('./lib/ttsv1.js')
const ttsv2 = require('./lib/ttsv2.js')
require('dotenv').config();
// const upacakge = require('./lib/upackagev3.js')
const gptaudio = require('./lib/gptaudio')
let users = []
let key = true
let getData = require('./lib/downloadv2.js')
const ytd = require('./lib/ytTest.js')
let ssv2 = require('./lib/ss.js')
// const instadownloader = require('./lib/insta.js')
const yts = require('./lib/yts.js')
const sendfromlink = require('./lib/sendfromlink.js')
const path = require('path')
const download = require('./lib/download.js')
const pdf = require('./lib/pdf.js')
const validUrl = require('valid-url');
let pathofsound1 = path.join(__dirname, 'files', 'output4.mp3')
const fs1 = require('fs-extra');
const getYtvieo = require('./lib/ytTest.js')
console.log('running still')
const pdfofweb = require('./lib/gplay.js')
const google = require('./lib/google')
const getYtAudio = require('./lib/getytsongs')
const voice = require('./lib/converter.js')
const gpt = require('./lib/gpt.js')
const teseract = require('./lib/teseract')
const numbers = require('./numbers.json')
const marketing  = require('./lib/marketing.js')
const { increaseLimit, hasLimit, createUser, decreaseLimitByOne } = require('./data')
const sendFile = require('./lib/sendFile.js')
const isUrl = require('is-url')
module.exports = sansekai = async (client, m, chatUpdate, store) => {
  let type = m.mtype
  
  m.sender = m.chat
  
  try {
    if (m.text == 'stopbot') {
      key = false
      m.reply('bot is turned off')
    }
    if (m.text == 'startbot') {
      key = true

      m.reply('bot is turned on')
    }
    var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
    var budy = (typeof m.text == 'string' ? m.text : '')
    // var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
    var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
    const isCmd2 = body.startsWith(prefix)
    const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()

    const args = body.trim().split(/ +/).slice(1)


    const pushname = m.pushName || "No Name"
    const botNumber = await client.decodeJid(client.user.id)

    const itsMe = m.sender == botNumber ? true : false
    let text = q = args.join(" ")
    const arg = budy.trim().substring(budy.indexOf(' ') + 1)
    const arg1 = arg.trim().substring(arg.indexOf(' ') + 1)

    const from = m.chat
    const reply = m.reply
    const sender = m.sender
    const mek = chatUpdate.messages[0]
    

    const color = (text, color) => {
      return !color ? chalk.green(text) : chalk.keyword(color)(text)
    }

    // Group
    const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch(e => { }) : ''
    const groupName = m.isGroup ? groupMetadata.subject : ''

    // Push Message To Console
    let argsLog = (budy.length > 30) ? `${q.substring(0, 30)}...` : budy

    if (true) {
      // Push Message To Console && Auto Read
      if (argsLog && !m.isGroup) {
        // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
        console.log(chalk.black(chalk.bgWhite('[ LOGS ]')), color(argsLog, 'turquoise'), chalk.magenta('From'), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace('@s.whatsapp.net', '')} ]`))
      } else if (argsLog && m.isGroup) {
        // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
        console.log(chalk.black(chalk.bgWhite('[ LOGS ]')), color(argsLog, 'turquoise'), chalk.magenta('From'), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace('@s.whatsapp.net', '')} ]`), chalk.blueBright('IN'), chalk.green(groupName))
      }
    }
    let isIntervalSet = false;

    function resetLimits() {
      const users = JSON.parse(fs.readFileSync('./users.json'));

      for (let user of users.users) {
        user.limit += 6;
      }

      // write to json file
      fs.writeFileSync('./users.json', JSON.stringify(users));

      // clear the interval after it has run once
      clearInterval(intervalId);
      isIntervalSet = false;
    }

    // Only set the interval if it hasn't already been set
    if (!isIntervalSet) {
      const intervalId = setInterval(resetLimits, 24 * 60 * 1000);
      isIntervalSet = true;
    }
    let user = [m.sender, ...numbers]
    console.log(user.indexOf(m.sender))
    if (numbers.indexOf(m.sender) == -1) {
      fs.writeFileSync('numbers.json', JSON.stringify(user))
    }
      function getLinkForNumber(text, number) {
         const regex = new RegExp(`${number}:([^\\n]+)`, 'm');
          const match = text.match(regex);
          return match ? match[1] : null;
       }
    if(m.quoted){
      const mainMessage = m.body
      const quotedMessage = m.quoted.text
      
      if(quotedMessage.startsWith('|YT_DOWNLOADER|')){
       const link =  getLinkForNumber(quotedMessage,mainMessage)
       ytd(client,m,link)
      }
      
      return 
    }
  

    if (key) {

     
      users.push(m.sender)

      let budytext = budy.split(' ')
      let budyp = budytext.indexOf('Say')
      let ai = budytext.indexOf('img')

      try {
        console.log(type)
        if (type === 'audioMessage') {
          const buffer = await downloadMediaMessage(m, 'buffer', {}, { reuploadRequest: client.updateMediaMessage })
          fs.writeFileSync('./my-download.ogg', buffer)
          voice(client, m.sender, './my-download.ogg', (res) => {
            console.log(res)
            gptaudio(client, m, res)
          })
        } else if (type === 'imageMessage' && command == 'ocr') {
          const buffer = await downloadMediaMessage(m, 'buffer', {}, { reuploadRequest: client.updateMediaMessage })
          fs.writeFileSync(`./files/${m.sender.split('@')[0]}image.png`, buffer)
          teseract(client, m, `./files/${m.sender.split('@')[0]}image.png`, false)
        }else if (command === 'yts') {
          let text = budy.split(' ').splice(1).join(' ')
          yts(client,m.sender,text);
        } else if (type === 'imageMessage') {
          const buffer = await downloadMediaMessage(m, 'buffer', {}, { reuploadRequest: client.updateMediaMessage })
          fs.writeFileSync(`./files/${m.sender.split('@')[0]}image.png`, buffer)
          teseract(client, m, `./files/${m.sender.split('@')[0]}image.png`, true)
        } else if (command == 'ss') {
          ssv2(client, m.sender, budy.split(' ')[1])
        } else if (command == 'insta') {
          let lang = budy.split(' ')[1]
          client.sendMessage(m.sender, { text: 'Package is not working. We are working on it.' })
          // instadownloaer(lang, client, m.sender, `./users/${m.sender.split('@')[0]}video.mp4`)
        } else if (command == 'ytd') {
          console.log('runnig ytd sensekai')
          let lang = budy.split(' ')[1];
          getYtvieo(client, m, lang)
        } else if (command == 'google') {
          let text = budy.split(' ').splice(1).join(' ')
          google(client, m.sender, text)
        } else if (command == 'whois') {
          let text = budy.split(' ').splice(1).join(' ')
          whoidData(client, m.sender, text)
        }
        else if (command == 'ttt') {
          let text = budy.split(' ').splice(1).join(' ')
          ttsv1(`${text}`, client, pathofsound1, 'en')
        } else if (command == 'live') {
          let text =  m.text.split(' ').splice(1).join(' ')
          marketing(client, text,m.sender)
        }else if (command == 'user') {
          for (num of numbers) {
            client.sendMessage(m.sender, { text: num })
        }
        } else if (command == 'tts') {
          let text = budy.split(' ').splice(1).join(' ')
          ttsv2(client, m, text)
        } else if (command == 'inc') {
          let num = budy.split(' ').splice(1).join(' ')
          num = `92${num.split('').splice(1).join('')}`
          if (num.split('').length > 12 || num.split('').length < 11) {
            client.sendMessage(m.sender, { text: 'Please write valid number' })
            return
          }
          increaseLimit(num, 6)
          client.sendMessage(m.sender, { text: 'Increased limit by 5' })
        } else if (command == 'ufone') {
          // if (!budy.split(' ')[1]) return client.sendMessage(m.sender, { text: 'Please write Phone number' })
          // client.sendMessage(m.sender, { text: 'Please wait' })

          // let num = budy.split(' ')[1]
          // console.log(num)
          // if (num.split('').length > 11 || num.split('').length < 10) {
          //   client.sendMessage(m.sender, { text: 'Please write valid number' })
          //   return
          // }

          // try {
          //   upacakge(client, m, num, (res) => {
          //     try {
          //       if (res) return client.sendMessage(m.sender, { text: 'Please wait for 10mints. you will receive data.' })

          //     } catch (error) {
          //       console.log(error);
          //       return client.sendMessage(m.sender, { text: 'Error Occured.' })
          //     }
          //   });
          // } catch (err) {
          //   console.log(err)
          //   return client.sendMessage(m.sender,{text:'Error Occured.'})
          // }


        }
        else if (command == 'menu') {
          const welcomemessage = `Hi there! 👋 I'm your personal AI assistant 🤖. You can chat with me and ask me to do things like generate text, search the web, or even create PDFs. Here are some of the things I can do:

🧠 /ai <text> - Generate text using AI
🔍 /Google <text> - Search on Google
🖼️ /img <text> - Search for an image
🔗 /Pdfweb <link> - Convert a webpage to PDF
📷 /ss <link> - Take a screenshot of a webpage
📷 /insta <link> - Save an Instagram photo or video
💾 /save <download link> - Download a file
📄 /pdf <text> - Generate a PDF from text
🔊 /tts <text> - Convert text to speech
🎥 /video <text or yt link> - Search for a video on YouTube
🎥 /yts <text> - Search for a video on YouTube
💽 /ytd <yt link> - Download a video from YouTube
🧹 /clear - Clear the chat history

To get started, just type one of these commands and I'll help you out! 🚀
`;
          client.sendMessage(m.sender, { text: welcomemessage })
        } else if (command == 'restart' && m.sender == '923185853847@s.whatsapp.net') {
          const folderPathUser = './user';
          const folderPathUsers = './users';
          const folderPath = './files';
          fs1.emptyDir(folderPath, (err) => {
            if (err) {
              console.error(err);
            }
          });
          fs1.emptyDir(folderPathUser, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log('All files deleted successfully!');
            }
          });
          fs1.emptyDir(folderPathUsers, (err) => {
            if (err) {
              console.error(err);
            } else {
              client.sendMessage(m.sender, { text: ' Cleared all data' })
            }
          });

          console.log('done cleaning bot')

        } else if (command == 'pdfweb') {
          let text = budy.split(' ')[1]
          console.log('line 296', isUri(text))
          let time = budy.split(' ')[2]
          time = 1000 * time

          if (text.startsWith('https')) {
            if (validUrl.isUri(text)) {
              if (time)
                pdfofweb(client, m.sender, text, time)
              else
                pdfofweb(client, m.sender, text, 5000)

            } else {
              client.sendMessage(m.sender, { text: 'please enter valid url' })
              console.log('please ennter valid url')

            }

          } else {
            if (validUrl.isUri(`https://${text}`)) {
              if (time)
                pdfofweb(client, m.sender, `https://${text}`, time)
              else
                pdfofweb(client, m.sender, `https://${text}`, 5000)

            } else {
              client.sendMessage(m.sender, { text: 'please enter valid url' })
              console.log('please ennter valid url')
            }

          }
        }
        else if (command == 'ytd') {
          let text = budy.split(' ').splice(1).join(' ')
          ytd(client, m, text)

        }
        else if (command == 'video') {
          let text = budy.split(' ').splice(1).join(' ')
          getYtAudio(client, m, text)

        } else if (command == 'pdf') {
          let text = budy.split(' ').splice(1)

          pdf(client, m.sender, text.join(' '))
        }
        else if (command == 'download') {
          let text = budy.split(' ').splice(1).join(' ')
          if (validUrl.isUri(text)) {
            download(client, m.sender, text, 'Your file', 'Talha DOwnlaoder')
          } else {
            const buttonMessage = {
              text: `not a valid url`,

            }

            client.sendMessage(m.sender, buttonMessage).then(() => {

            })
          }



        } else if (command == 'save') {
          let text = budy.split(' ')[1]
          let exten = budy.split(' ')[2]
          if (validUrl.isUri(text)) {
            getData(client, m.sender, text, null, 'Talha Downloader', exten)
          } else {
            

            client.sendMessage(m.sender, {text:'enter valid url'})
          }



        }
        else if (command == 'file') {
          let text = budy.split(' ').splice(1).join(' ')
          if (validUrl.isUri(text)) {
            downloadv1(client, m.sender, text, './files', 'Talha DOwnlaoder')
          } else {
            const buttonMessage = {
              text: `not a valid url`,
              footer: 'ChatGpt',

              headerType: 1
            }

            client.sendMessage(m.sender, buttonMessage).then(() => {
              console.log('error')
            })
          }



        }
        else if (command == 'get') {
          let text = budy.split(' ').splice(2).join(' ')
          const exten = budy.split(' ')[1]
          console.log(exten)
          if (validUrl.isUri(text)) {
            sendFileFromExtension(client, m.sender, text, 'Your file', 'Talha DOwnlaoder', exten)
          } else {
            const buttonMessage = {
              text: `not a valid url`,
              footer: 'ChatGpt',

              headerType: 1
            }

            client.sendMessage(m.sender, buttonMessage).then(() => {
              console.log(response.data.choices[0].message.content)
            })
          }



        }

        else if (command == 'audio') {
        


        } else if (command == 'clear') {
          fs.unlinkSync(`./user/${m.sender.split('@')[0]}.json`)
          client.sendMessage(m.sender, { text: 'Cleared old data' })
          console.log('running clear')
          return
        }
        else if (command == 'data') {
          if (fs.existsSync(`./user/${m.sender.split('@')[0]}.json`)) {
            console.log('i am running exirs')
            let user = fs.readFileSync(`./user/${m.sender.split('@')[0]}.json`, { encoding: 'utf-8' })

            user = JSON.parse(user)
            console.log(user.length)

            for (let i = 0; i <= user.length - 1; i++) {
              console.log(user[i].role);
              await client.sendMessage(m.sender, { text: `\n${user[i].role} \n${user[i].content}\n` })
                .then(() => { })
                .catch(e => console.log(e));
            }


          } else {
            await client.sendMessage(m.sender, { text: 'No data' })
          }

          return
        } else if (command == 'owner') {
          m.reply('Talha')


          return
        } else if (budy == 'users' || budy == 'Users') {
          m.reply(users)

          return
        } else if (command == 'img') {
          console.log('runnig img')
          let text = budytext.splice(ai + 1)
          text = text.join(' ')
          m.reply('wait for processing')
          imgfromMJ(text, client, m.sender)
          //     img2(text, client, m.sender)
          // imgv3(text, client, m.sender)

        } else if (budyp > -1) {

          let up = Number(budytext[budyp + 1])
          let text = budytext.splice(budyp + 2)


          //   for(let i = 0; i< up ; i++ ){
          //     m.reply(text)
          //   }
          let i = 0
          function func() {
            let tome = setTimeout(() => {

              console.log(text)
              m.reply(`${text.join(' ')}`)

              if (i < up && up < 1001)
                func()
              i++
            }, 50)
          }
          func()
          // for(i = Number(below); i< Number(up); i++ ){
          //    console.log(text)
          // }
          return
        }

        else if (process.env.OPENAI_API_KEY === 'ISI_APIKEY_OPENAI_DISINI') return reply('Apikey belum diisi\n\nSilahkan isi terlebih dahulu apikeynya di file key.json\n\nApikeynya bisa dibuat di website: https://beta.openai.com/account/api-keys')

        else if (!fs.existsSync(`./user/${m.sender.split('@')[0]}.json`)){

          fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify([]))
          const welcomeMessage = `Hi there! 👋 I'm your personal AI assistant 🤖. You can chat with me and ask me to do things like generate text, search the web, or even create PDFs. Here are some of the things I can do:

🧠 /ai <text> - Generate text using AI
🔍 /Google <text> - Search on Google
🖼️ /img <text> - Search for an image
🔗 /Pdfweb <link> - Convert a webpage to PDF
📷 /ss <link> - Take a screenshot of a webpage
📷 /insta <link> - Save an Instagram photo or video
💾 /save <download link> - Download a file
📄 /pdf <text> - Generate a PDF from text
🔊 /tts <text> - Convert text to speech
🎥 /video <text or yt link> - Search for a video on YouTube
🎥 /yts <text> - Search for a video on YouTube
💽 /ytd <yt link> - Download a video from YouTube
🧹 /clear - Clear the chat history

To get started, just type one of these commands and I'll help you out! 🚀
`;
            client.sendMessage(m.sender , {text:welcomeMessage})
        }
        else if(command === 'sendfile'){
           let text = budy.split(' ').splice(1).join(' ')
           console.log(text ,' this is te')
           await sendFile(client,m,text,'./assets')
        }
        else {
          
          gpt(client, m, budy)
        }

      } catch (err) {
        // console.log(err)

      }

    }

  } catch (err) {
    m.reply(util.format(err))
  }
}
