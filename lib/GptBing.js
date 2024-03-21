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
  const message = await client.sendMessage(m.sender, {
    text: wait(),
  });
  let budy = text;
  let data = [];
  const chat = `You are whatsapp bot your name is MJ whatsapp BOT. You are created By Talha. Talha has telegram channel t.me/talhariaz .`;

  if (!fs.existsSync(`./info/${m.sender.split("@")[0]}.json`)) {
    let user = { role: "user", content: budy };
    data.push(user);
    fs.writeFileSync(
      `./info/${m.sender.split("@")[0]}.json`,
      JSON.stringify([user])
    );
    let data1 = [{ role: "system", content: chat }, ...data];
    data = data1;
  } else {
    let user = fs.readFileSync(`./info/${m.sender.split("@")[0]}.json`);
    user = JSON.parse(user);
    user.push({ role: "user", content: budy });

    data = user;

    fs.writeFileSync(
      `./info/${m.sender.split("@")[0]}.json`,
      JSON.stringify(user)
    );
  }

  bing(
    {
      messages: data,
      conversation_style: "Balanced",
      markdown: false,
      stream: true,
    },
    (err, data) => {
      if (err != null) {
        console.log(err);
      } else {
        client.sendMessage(m.sender, { text: data.message, edit: message.key });
        console.log(data.message);
        if (data.finish) {
          let user = fs.readFileSync(`./info/${m.sender.split("@")[0]}.json`);
          user = JSON.parse(user);
          user.push({ role: "assistant", content: data.message });
          fs.writeFileSync(
            `./info/${m.sender.split("@")[0]}.json`,
            JSON.stringify(user)
          );
        }
      }
    }
  );
};

module.exports = Bing;
