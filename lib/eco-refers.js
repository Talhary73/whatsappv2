const axios = require("axios");
const cheerio = require("cheerio");
const Tesseract = require("tesseract.js");
const Captcha = async () => {
  const {
    data: { captcha_src, captcha_id },
  } = await sendCaptchaRequest();
  const {
    data: { text },
  } = await Tesseract.recognize(captcha_src);
  if (parseInt(text).length < 4) return Captcha();
  return { captcha_id, captcha_code: parseInt(text) };
};

async function sendCaptchaRequest() {
  const url = "https://api.eco-capsule.com/api/passport/captcha";
  const headers = {
    Host: "api.eco-capsule.com",
    "Content-Length": "0",
    "Sec-Ch-UA":
      '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
    "Content-Type": "application/x-www-form-urlencoded",
    "Sec-Ch-UA-Mobile": "?1",
    Authorization: "Bearer", // You need to provide the actual token here
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36",
    "Sec-Ch-UA-Platform": '"Android"',
    Accept: "*/*",
    Origin: "https://www.eco-capsule.com",
    "Sec-Fetch-Site": "same-site",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    Referer: "https://www.eco-capsule.com/",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "en-US,en;q=0.9",
  };

  try {
    const response = await axios.post(url, {}, { headers });
    // console.log("Captcha request sent successfully:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error sending captcha request:", error);
    throw error;
  }
}
function generateRandomString(length) {
  const characters = "0123456789abcdef";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}
function generateRandomNumber() {
  const min = 100000000; // Minimum 9-digit number
  const max = 999999999; // Maximum 9-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// sendCaptchaRequest();
const Register = async (inviteCode) => {
  const { captcha_id, captcha_code } = await Captcha();
  fetch("https://api.eco-capsule.com/api/passport/register", {
    headers: {
      accept: "*/*",
      "accept-language": "en-GB,en;q=0.9",
      authorization: "Bearer",
      "content-type": "application/x-www-form-urlencoded",
      "sec-ch-ua":
        '"Microsoft Edge";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      Referer: "https://www.eco-capsule.com/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: `mobile=3${generateRandomNumber()}&password=dfgdfgfdgfdgd&captcha_id=${captcha_id}&captcha_code=${captcha_code}&invite_code=${inviteCode}&device_id=${generateRandomString(
      32
    )}&register_code=`,
    method: "POST",
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.error(err);
      return { code: 0, message: "Failed to register" };
    });
};
// for (let i = 0; i <= 30; i++) {
//   Register("3TvubD");
// }
let i = 0;
const wait = () => {
  i = i + 1;
  let j = i % 4;
  if (j == 0) return ".";
  else if (j == 1) return "..";
  else if (j == 2) return "...";
  else if (j == 3) return "....";
};
const EcoRefer = async (client, m, code) => {
  let i = 0;
  let j = 0;
  const message = await client.sendMessage(m.sender, {
    text: "Please Wait...",
  });
  const message1 = await client.sendMessage(m.sender, {
    text: `Filed Accounts :${j}`,
  });

  for (let i = 0; i <= 50; i++) {
    const res = await Register(code);
    if (res.code == 1) {
      i = i + 1;
      client.sendMessage(m.sender, {
        text: `*${i} Accounts Registered Successfully!*${wait()}`,
        edit: message.key,
      });
    } else {
      j = j + 1;
      client.sendMessage(m.sender, {
        text: `*${j} Accounts Failed to Register!*${wait()}`,
        edit: message1.key,
      });
    }
  }

  client.sendMessage(m.sender, {
    text: `Total off ${i} accounts registered successfully!`,
    edit: message.key,
  });
  client.sendMessage(m.sender, {
    text: `Total off ${j} accounts Failed to Register!`,
    edit: message1.key,
  });
};

module.exports = EcoRefer;
