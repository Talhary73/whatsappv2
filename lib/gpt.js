const OpenAI =  require("openai");
require('dotenv').config();
const fs = require('fs');
function getRandomItemFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

module.exports = async (client, m, budy) => {
client.sendPresenceUpdate(m.sender,'typing');

const apiKeys = [process.env.OPENAI_API_KEY,process.env.API_KEY_1,process.env.API_KEY_3]

const openai = new OpenAI({apiKey:getRandomItemFromArray(apiKeys)});

  try {
    const chat = `You are whatsapp bot your name is MJ whatsapp BOT.`;

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
