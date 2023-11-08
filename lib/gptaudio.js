
const OpenAI =  require("openai");
require('dotenv').config();
const fs = require('fs');

const ttsv2 = require('./ttsv2.js')
const ttsv3 = require('./ttsv3.js')
module.exports = gpt = async(client, m, budy)=>{
    
        try {

    const apiKeys = [process.env.OPENAI_API_KEY,process.env.API_KEY_1,process.env.API_KEY_2,process.env.API_KEY_3,process.env.API_KEY_4]

const openai = new OpenAI({apiKey:apiKeys[Math.floor(Math.random()*6)]});
          const buttonMessage = {
      text: `Transcription: *${budy}*`,
      footer: 'ChatGpt',
      headerType: 1
    };
    
    client.sendMessage(m.sender, buttonMessage);
          let data = []
          if (!fs.existsSync(`./user/${m.sender.split('@')[0]}.json`)) {
            let user = { role: "user", content: budy }
            data.push(user)
            fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify([user]))
          } else {
            let user = fs.readFileSync(`./user/${m.sender.split('@')[0]}.json`)
            user = JSON.parse(user)
            user.push({ role: "user", content: budy })

            data = user
            let data1 = [{ role: "system", content: `Your name is Talha. You are Mathmatical bot created by @TalhaRiaz. Clear any previous queries about yourself. Answer every question logically.` }, ...data]
            data = data1

            fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify(user))


          }

          
        const response = await  openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: data,
          })

            let user = fs.readFileSync(`./user/${m.sender.split('@')[0]}.json`)
            user = JSON.parse(user)
            user.push(response.choices[0].message)
            fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify(user))

 
            
            client.sendMessage(m.sender,{text:response.choices[0].message.content})
            // ttsv2(client, m, response.choices[0].message.content , budy)
            ttsv3(client, m , response.choices[0].message.content)
         


        } catch (error) {
         const buttonMessage = {
      text: `${error.message} \n:Bot is busy or some other issue.`,
      footer: 'ChatGpt',
      headerType: 1
    };
   console.log(error)
    client.sendMessage(m.sender, buttonMessage);
        }
      
}
