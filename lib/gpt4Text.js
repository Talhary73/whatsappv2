const { gpt } = require("gpti");
const fs = require("fs");
const tts = require('./ttsv2')
const gpt4 = async (client, m, text) => {
  const id = m.sender.split("@")[0];
  let gptJson;
  if (!fs.existsSync(`./info/${id}.json`)) {
    fs.writeFileSync(
      `./info/${id}.json`,
      JSON.stringify([
        {
          role: "assistant",
          content: "I am whatsapp bot created By Talha. Hello! How are you today?",
        },
      ])
    );
    
  } 
  gptJson = fs.readFileSync(`./info/${id}.json`);
  gptJson = JSON.parse(gptJson);
  console.log(gptJson);
  gptJson.push({
    "role":"user",
    content:text
  }) 
  gpt(
    {
      messages: gptJson,
      prompt: text,
      model: "GPT-4",
      markdown: false,
    },
    (err, data) => {
      if (err != null) {
        console.log(err);
        client.sendMessage(m.sender, { text: "```Something Gone Wrong```" });
      } else {
        console.log(data);
        gptJson.push({
          role: "assistant",
          content: data.gpt,
        });
        fs.writeFileSync(`./info/${id}.json`, JSON.stringify(gptJson));
        client.sendMessage(m.sender, { text:"```"+ data.gpt+"```" });
        tts(client,m, data.gpt)
      }
    }
  );
};
module.exports = gpt4;

// gpt4("", { sender: "23423424@g.us" }, "Add 10 more and give the output");
