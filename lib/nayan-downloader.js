const {
  ndown,
  tikdown,
  twitterdown,
  GDLink,
} = require("nayan-media-downloader");
const axios = require("axios");
const { facebook, instagram, pinterest } = require("betabotz-tools");

// const PinterestDl = async (client, m, url) => {
//   try {
//     const results = await pinterest(url);
//     console.log(results); // JSON
//     return results; //JSON
//   } catch (error) {
//     console.log(error);
//     // client.sendMessage(m.sender,{text:error.message})
//   }
// };
// PinterestDl("", "", "https://pin.it/3C6M0kzuA");
const FbDlonError = async (client, m, url) => {
  // const url = "";
  const results = await facebook(url);
  // console.log(results); // JSON
  if (results.status == 200) {
    if (results?.result?.sd_q)
      client.sendMessage(m.sender, {
        video: { url: results?.result?.sd_q },
        caption: "SD quality",
      });
    if (results?.result?.hq_q)
      client.sendMessage(m.sender, {
        video: { url: results?.result?.hq_q },
        caption: "SD quality",
      });
    return;
  }

  return client.sendMessage(
    m.sender,
    { text: "something gone wrong" },
    { quoted: m }
  ); //JSON
};
const InDlonError = async (client, m, url) => {
  // const url = "";
  const results = await instagram(url);
  // console.log(results); // JSON
  // return;
  if (results.status == 200) {
    await client.sendMessage(m.sender, {
      video: { url: results.result[0]._url },
    });
    return;
  }

  return client.sendMessage(
    m.sender,
    { text: "something gone wrong" },
    { quoted: m }
  ); //JSON
};
// InDlonError(
//   "",
//   "",
//   "https://www.instagram.com/reel/C4mw3txPsGK/?igsh=enlqejljYnJnMWxw"
// );

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
    if (!URL.status) {
      InDlonError(client, m, url);
      FbDlonError(client, m, url);
    }
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
    FbDlonError(client, m, url);
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
    let URL = await GDLink(url);

    console.log(URL);
  } catch (error) {
    console.log(error);
  }
};
// GDNayan(
//   "",
//   "",
//   "https://drive.google.com/drive/u/0/mobile/folders/1JhX0MPmobnXQbPM0djhkNWa8btnVvSWE?pli=1"
// );
module.exports = { FbNayan, TiktokNayan, twitterNayan, InDlonError };
