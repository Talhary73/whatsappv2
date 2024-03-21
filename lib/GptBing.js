const { bing } = require("gpti");
const fs = require("fs");
let i = 0;
const wait = () => {
  i = i + 1;
  let j = i % 4;
  if (j == 0) return "Wait a moment, I'm thinking.";
  else if (j == 1) return "Wait a moment, I'm thinking..";
  else if (j == 2) return "Wait a moment, I'm thinking...";
  else if (j == 3) return "Wait a moment, I'm thinking....";
};
const Bing = async (client, m, text) => {
  if (!fs.existsSync("./info")) fs.mkdirSync("./info");
  const message = await client.sendMessage(m.sender, {
    text: wait(),
  });
  const init = await setInterval(async () => {
    client.sendMessage(m.sender, {
      text: wait(),
      edit: message.key,
    });
  }, 100);
  let data = [];
  if (!fs.existsSync("./info/" + m.sender.split("@")[0] + ".json")) {
    data = [{ role: "user", content: text }];
    fs.writeFileSync(
      "./info/" + m.sender.split("@")[0] + ".json",
      JSON.stringify(data)
    );
  }
  data = JSON.parse(
    fs.readFileSync("./info/" + m.sender.split("@")[0] + ".json")
  );
  data.push({ role: "user", content: text });

  bing(
    {
      messages: data,
      conversation_style: "Balanced",
      markdown: false,
      stream: true,
    },
    (err, data1) => {
      clearInterval(init);
      if (err != null) {
        console.log(err);
      } else {
        client.sendMessage(m.sender, {
          text: data1.message,
          edit: message.key,
        });
        console.log(data1.message);
        if (data1.finish) {
          data.push({ role: "assitant", content: data1.message });
          fs.writeFileSync(
            "./info/" + m.sender.split("@")[0] + ".json",
            JSON.stringify(data)
          );
        }
      }
    }
  );
};

module.exports = Bing;
