const { gpt, stablediffusion, dalle } = require("gpti");

const dallE = async (client, m, text) => {
  dalle.v1(
    {
      prompt: text,
    },
    (err, data) => {
      if (err != null) {
        console.log(err);
      } else {
        console.log(data);
        for (let i = 0; i < data.images.length; i++) {
        //   fs.writeFileSync(
        //     `./image${i}.png`,
        //     Buffer.from(data.images[i].split("base64,")[1], "base64")
        //   );
          client.sendMessage(m.sender, {
            image: Buffer.from(data.images[i].split("base64,")[1], "base64"),
          });
        }
      }
    }
  );
};

module.exports = dallE