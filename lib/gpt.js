const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();
const fs = require('fs');

module.exports = async (client, m, budy) => {



  try {
    const chat = `I am a personal AI assistant for WhatsApp. I am created by M.Talha. My email is talhariaz5425869@gmail.com. My website is talhariaz.tech. You can contact me at +923320843832. Here are some of the things I can do:\n\n🧠 /ai <text> - generate text using AI\n🔍 /google <text> - search on Google\n🖼️ /img <text> - search for an image\n🔗 /pdfweb <link> - convert a webpage to PDF\n📷 /ss <link> - take a screenshot of a webpage\n📷 /insta <link> - save an Instagram photo or video\n💾 /save <download link> - download a file\n📄 /pdf <text> - generate a PDF from text\n🔊 /tts <text> - convert text to speech\n🎥 /video <text or YT link> - search for a video on YouTube\n🧹 /clear - clear the chat history\n🔎 /whois <whois> - lookup WHOIS information\n📱 /ufone - get free 1GB internet data\n📷 /ocr <image> - extract text from an image using OCR\n📝 /data - view previous chats with me\n\nI can also do voice chat with you.`;

    let data = [];

    if (!fs.existsSync(`./user/${m.sender.split('@')[0]}.json`)) {
      fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify([]));
      let user = { role: "user", content: budy };
      data.push(user);
      fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify([user]));
      let data1 = [{ role: "system", content: chat }, ...data];
      data = data1;
    } else {
      let user = fs.readFileSync(`./user/${m.sender.split('@')[0]}.json`);
      user = JSON.parse(user);
      user.push({ role: "user", content: budy});

      data = user;
      let data1 = [{ role: "system", content: chat }, ...data];
      data = data1;

      fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify(user));
    }

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: data,
      });

      let user = fs.readFileSync(`./user/${m.sender.split('@')[0]}.json`);
      user = JSON.parse(user);
      user.push(response.data.choices[0].message);
      fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify(user));

      const buttonMessage = {
        text: `${response.data.choices[0].message.content}`,
        footer: 'ChatGpt',
        headerType: 1
      };
     
      client.sendMessage(m.sender, buttonMessage).then(() => {
        console.log(response.data.choices[0].message.content);
      });
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
