const { gpt, stablediffusion } = require("gpti");

const SDXL = async (client, m, text) => {
  try {
    stablediffusion.xl(
      {
        prompt: text,
        data: {
          prompt_negative: "blurry face, blurry text, Changed Text",
          image_style: "(No style)",
          guidance_scale: 8.0,
        },
      },
      (err, data) => {
        if (err != null) {
          console.log(err);
        } else {
          console.log(data);
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
  } catch (error) {
    console.log(error);
  }
};
module.exports = SDXL