const { gpt } = require("gpti");
const fs = require("fs");
const tts = require("./ttsv2");
const gpt4 = async (client, m, text) => {
  const message = await client.sendMessage(m.sender, {
    text: "Please Wait... ",
  });

  const id = m.sender.split("@")[0];
  let gptJson;
  if (!fs.existsSync(`./info/${id}.json`)) {
    fs.writeFileSync(
      `./info/${id}.json`,
      JSON.stringify([
        {
          role: "assistant",
          content:
            "I am whatsapp bot created By Talha. Hello! How are you today?. This is my official channel link. https://whatsapp.com/channel/0029VaUhqg1KLaHfQ8pYII3k. I will send it everytime when I satisfy your request.",
        },
      ])
    );
  }
  gptJson = fs.readFileSync(`./info/${id}.json`);
  gptJson = JSON.parse(gptJson);
  console.log(gptJson);

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
        // console.log(data);
        gptJson.push({
          role: "user",
          content: text,
        });
        gptJson.push({
          role: "assistant",
          content: data.gpt,
        });
        fs.writeFileSync(`./info/${id}.json`, JSON.stringify(gptJson));
        client.sendMessage(m.sender, { text: data.gpt + '\nMADE BY ANJUM', edit: message.key });
        // client.sendMessage(m.sender, { text: data.gpt+"\n \n Join Group for Updates https://chat.whatsapp.com/C0QLtPYRge5E8Qbv9IpNlZ" }, { quoted: m });
        tts(client, m, data.gpt);
      }
    }
  );
};
module.exports = gpt4;

// gpt4("", { sender: "23423424@g.us" }, "Add 10 more and give the output");
