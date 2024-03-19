const { removebg } = require("betabotz-tools");
const axios = require("axios");
const RemoveBg = async (url) => {
  try {
    const result = await removebg(url);
    // console.log(result);
    // await client.sendMessage(id, { image: { url: result.image_data } });

    const buffer = await axios.get(result.image_data, {
      responseType: "arraybuffer",
    });
    return { error: false, data: buffer.data };
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};
// Upscale("", "", "https://i.imgur.com/3bY1g3K.jpg");
module.exports = RemoveBg;
