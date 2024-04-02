const { ndown, tikdown } = require("nayan-media-downloader");
const axios = require('axios')
const JpegThumbnail = async (url)=>{
 const res = await axios.get(url,{responseType:'arraybuffer'})
 
}
const FbNayan = async (client, m, url) => {
  try {
    if (!url) return; // client.sendMessage(m.chat, {text:'Please provide a valid url'}, {quoted:m})
    let URL = await ndown(url);
    console.log(URL.status);
    if (!URL.status)
      return client.sendMessage(
        m.chat,
        { text: "Something goes Wrong" },
        { quoted: m }
      );
    await URL.data.forEach(async (el) => {
      if (!el.shouldRender)
        await client.sendMessage(
          m.sender,
          {
            video: { url: el.url },
            caption: el.resolution,
            mimetype: "video/mp4",
          },
          { quoted: m }
        );
    });
  } catch (error) {
    console.log(error);
  }
};

for (let i = 0; i <= 20; i++) {
  FbNayan(
    "",
    "",
    "https://www.facebook.com/FoodMakersBr/videos/tire-o-feij%C3%A3o-do-pote-de-sorvete-e-fa%C3%A7a-essa-receita-ainda-hoje/454262112817834/"
  );
}
