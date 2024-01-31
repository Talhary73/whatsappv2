const { RsnChat } = require("rsnchat");
const fs = require('fs')
const rsnchat = new RsnChat("chatgpt_Nh7MpKsQrdh6lqjsq9Ir4M");

const prompt = "beautiful girl";

rsnchat.icon(prompt).then((response) => {
  console.log(response.success);
  fs.writeFileSync('./image.png',Buffer.from(response.image,'base64'))
});