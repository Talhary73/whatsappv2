const { remini } = require("betabotz-tools");

const Upscale = async (client, id, url) => {
  try {
    const result = await remini(url);
    console.log(result);
    await client.sendMessage(id, { image: { url: result.image_data } });
    return result;
  } catch (error) {
    console.log(error);
    client.sendMessage(id, { text: error.message });
  }
};
// for(let i = 0;i<20;i++){

// }

// Upscale("", "", "https://i.imgur.com/3bY1g3K.jpg");
module.exports = Upscale;
