const { GoogleGenerativeAI } = require("@google/generative-ai");
//mODUELS
require('dotenv').config()
const fs = require("fs");
// 
function getRandomItemFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
// Access your API key as an environment variable (see "Set up your API key" above)

//apis/
const apis = [process.env.BARD_API_1, process.env.BARD_API_2]
const genAI = new GoogleGenerativeAI(getRandomItemFromArray(apis));



async function run(client,m, text) {
try {
  const id = m.sender.split('@')[0]
    let history;
    if (!fs.existsSync(`./data/${id}.json`)) {
      history = [];
      fs.writeFileSync(`./data/${id}.json`, JSON.stringify(history));
    } else {
      history = fs.readFileSync(`./data/${id}.json`, { encoding: "utf-8" });
      history = JSON.parse(history);
    }
  
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
    const chat = model.startChat({
      history: history,
    });
  
    const result = await chat.sendMessage(text);
    const response = result.response;
    console.log(response);
    const ModelRes = response.text();
    const user = { role: "user", parts: text };
    const parts = { role: "model", parts: ModelRes };
    history.push(user, parts);
    fs.writeFileSync(`./data/${id}.json`, JSON.stringify(history));
    client.sendMessage(m.sender,{text:ModelRes},{quoted:m})
} catch (error) {
   const id = m.sender.split('@')[0]
   client.sendMessage(m.sender,{text:error.message})
   fs.unlinkSync(`./data/${id}.json`)
   console.log(error)
}
}
module.exports = run
// run("1024324", "what is real analysis.");
