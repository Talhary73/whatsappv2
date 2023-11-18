const OpenAI = require("openai");
const axios = require("axios");
const cheerio = require("cheerio");
require('dotenv').config();
const fs = require('fs');
function getRandomItemFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

module.exports = async (client, m, budy , url) => {
client.sendPresenceUpdate(m.sender,'typing');

const apiKeys = [process.env.OPENAI_API_KEY,process.env.API_KEY_1,process.env.API_KEY_3]

const openai = new OpenAI({apiKey:getRandomItemFromArray(apiKeys)});

  try {
    const chat = `I am a personal AI assistant for WhatsApp. I am created by M.Talha. My email is talhariaz5425869@gmail.com. My website is talhariaz.tech. You can contact me at +923320843832. Here are some of the things I can do:\n\n🧠 /ai <text> - generate text using AI\n🔍 /google <text> - search on Google\n🖼️ /img <text> - search for an image\n🔗 /pdfweb <link> - convert a webpage to PDF\n📷 /ss <link> - take a screenshot of a webpage\n📷 /insta <link> - save an Instagram photo or video\n💾 /save <download link> - download a file\n📄 /pdf <text> - generate a PDF from text\n🔊 /tts <text> - convert text to speech\n🎥 /video <text or YT link> - search for a video on YouTube\n🧹 /clear - clear the chat history\n🔎 /whois <whois> - lookup WHOIS information\n📱 /ufone - get free 1GB internet data\n📷 /ocr <image> - extract text from an image using OCR\n📝 /data - view previous chats with me\n\nI can also do voice chat with you.`;
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    const webText = $("body").text();
    let data = [];

    if (!fs.existsSync(`./user/${m.sender.split('@')[0]}.json`)) {
      fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify([]));
      let user = { role: "user", content: budy };
      let web = { role: "assistant", content: webText } 
      data.push(user);
      data.push(web)
      fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify([user]));
      let data1 = [{ role: "system", content: chat }, ...data];
      data = data1;
    } else {
      let user = fs.readFileSync(`./user/${m.sender.split('@')[0]}.json`);
      user = JSON.parse(user);
      user.push({ role: "user", content: budy}, { role: "assistant", content: webText });

      data = user;
      let data1 = [{ role: "system", content: chat }, ...data];
      data = data1;

      fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify(user));
    }

   
    
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-16k",
        messages: data,
      });
      console.log(response)
      let user = fs.readFileSync(`./user/${m.sender.split('@')[0]}.json`);
      user = JSON.parse(user);
      user.push(response.choices[0].message);
      fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify(user));

      const buttonMessage = {
        text: `${response.choices[0].message.content}`,
        footer: 'ChatGpt',
        headerType: 1
      };
     
      client.sendMessage(m.sender, buttonMessage)
    } 

   catch (error) {
    const buttonMessage = {
      text: `${error.message} \n:Bot is busy or some other issue.`,
      footer: 'ChatGpt',
      headerType: 1
    };
   console.log(error)
    client.sendMessage(m.sender, buttonMessage);

   
  }

}
