const { pixart } = require("gpti");
const Pixart = async (client, m, text) => {
  pixart.lcm(
    {
      prompt: text,
      data: {
        prompt_negative: "",
        image_style: "",
        width: 1024,
        height: 1024,
        lcm_inference_steps: 9,
      },
    },
    (err, data) => {
      if (err != null) {
        console.log(err);
      } else {
        for (let i = 0; i < data.images.length; i++) {
          // fs.writeFileSync(
          //   `./image${i}.png`,
          //   Buffer.from(data.images[i].split("base64,")[1], "base64")
          // );
          client.sendMessage(m.sender, {
            image: Buffer.from(data.images[i].split("base64,")[1], "base64"),
          });
        }
      }
    }
  );
};
module.exports = Pixart;