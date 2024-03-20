const { spotify, spotifydl } = require("betabotz-tools");

const AllInOneDownloader = async (client, id, url) => {
  try {
    const q = "dj dalinda";
    const results = await spotify(q);
    console.log(results.result.data[0].url);
    const res = await spotifydownload(results.result.data[0].url);
    console.log(res);
    return results; //JSON
  } catch (error) {
    console.log("error");
  }
};

const spotifydownload = async (url) => {
  try {
    const results = await spotifydl(url);
    console.log(results); // JSON
    return results; //JSON
  } catch (error) {
    console.log("error");
  }
};

module.exports = AllInOneDownloader;

let urls = `https://www.instagram.com/reel/C4mw3txPsGK/?igsh=enlqejljYnJnMWxw

https://www.facebook.com/reel/280183571233303?mibextid=xCPwDs&s=yWDuG2&fs=e

https://vt.tiktok.com/ZSFunYk2f/`
  .split(" ")
  .join("")
  .split("\n");
let newUrls = [];
for (url of urls) {
  if (url) {
    newUrls.push(url);
  }
}
urls = newUrls;

// for (url of urls) {
//   AllInOneDownloader("", "", url);
// }
AllInOneDownloader(
  "",
  "",
  "https://www.facebook.com/reel/280183571233303?mibextid=xCPwDs&s=yWDuG2&fs=e"
);
// AllInOneDownloader(
//   "",
//   "",
//   "https://m.instagram.com/video/242512123_1015359823"
// );
