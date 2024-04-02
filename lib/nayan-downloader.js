const {
  ndown,
  tikdown,
  twitterdown,
  GDLink,
} = require("nayan-media-downloader");
const axios = require("axios");
const JpegThumbnail = async (url) => {
  const res = await axios.get(url, { responseType: "arraybuffer" });
};
const FbNayan = async (client, m, url) => {
  try {
    if (!url)
      return client.sendMessage(
        m.chat,
        { text: "Please provide a valid url" },
        { quoted: m }
      );
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
const TiktokNayan = async (client, m, url) => {
  try {
    if (!url)
      return client.sendMessage(
        m.chat,
        { text: "Please provide a valid url" },
        { quoted: m }
      );

    let URL = await tikdown(url);

    if (!URL.status)
      return client.sendMessage(
        m.chat,
        { text: "Something goes Wrong" },
        { quoted: m }
      );

    await client.sendMessage(
      m.sender,
      {
        video: { url: URL.data.video },
        caption: URL.data.title,
        mimetype: "video/mp4",
      },
      { quoted: m }
    );
  } catch (error) {
    console.log(error);
  }
};
const twitterNayan = async (client, m, url) => {
  try {
    if (!url)
      return client.sendMessage(
        m.chat,
        { text: "Please provide a valid url" },
        { quoted: m }
      );

    let URL = await twitterdown(url);

    if (!URL.status)
      return client.sendMessage(
        m.chat,
        { text: "Something goes Wrong" },
        { quoted: m }
      );

    await client.sendMessage(
      m.sender,
      {
        video: { url: URL.data["HD"] },

        mimetype: "video/mp4",
      },
      { quoted: m }
    );
  } catch (error) {
    console.log(error);
  }
};
const GDNayan = async (client, m, url) => {
  try {
    if (!url)
      return client.sendMessage(
        m.chat,
        { text: "Please provide a valid url" },
        { quoted: m }
      );

    let URL = await GDLink(url);

    if (!URL.status)
      return client.sendMessage(
        m.chat,
        { text: "Something goes Wrong" },
        { quoted: m }
      );

    await client.sendMessage(
      m.sender,
      {
        video: { url: URL.data["HD"] },

        mimetype: "video/mp4",
      },
      { quoted: m }
    );
  } catch (error) {
    console.log(error);
  }
};
module.exports = { FbNayan, TiktokNayan, twitterNayan };
