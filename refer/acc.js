const axios = require("axios");
const cheerio = require("cheerio");
const Tesseract = require("tesseract.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const fs = require("fs");
// const axios = require("axios")
function getRandomItemFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
// Access your API key as an environment variable (see "Set up your API key" above)

//apis/
const apis = [process.env.BARD_API_1, process.env.BARD_API_2];
const genAI = new GoogleGenerativeAI(getRandomItemFromArray(apis));

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(buffer).toString("base64"),
      mimeType,
    },
  };
}

async function ExtractText(base64) {
  try {
    const buffer = Buffer.from(
      base64.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const prompt = "Extract text from image and only return text.";
    const type = "image/png";
    // For text-and-image input (multimodal), use the gemini-pro-vision model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const imageParts = [fileToGenerativePart(buffer, type)];
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = result.response;
    const text = response.text();
    // console.log(text);
    return text;
    // client.sendMessage(m.sender, { text: text });
  } catch (error) {
    console.log(error);
    // client.sendMessage(m.sender, {
    //   text: error.message + "\n Image should not contain Human face.",
    // });
  }
}

const Captcha = async () => {
  const {
    data: { captcha_src, captcha_id },
  } = await sendCaptchaRequest();
  const {
    data: { res1: code },
  } = await axios.post(
    "https://tesseract-api-3211d4288b87.herokuapp.com/api/v1/ocr",
    { img: captcha_src }
  );

  const text = code
    .split(" ")
    .join("")
    .replace(/[a-zA-Z]/g, "");
  console.log(text);
  //   const {
  //     data: { text },
  //   } = await Tesseract.recognize(captcha_src);
  if (parseInt(text).length < 4) return Captcha();
  return { captcha_id, captcha_code: parseInt(text) };
};
// Captcha();
async function sendCaptchaRequest() {
  const url = "https://mp.wcc92.com/api/passport/captcha";
  const headers = {
    Host: "mp.wcc92.com",
    "Content-Length": 0,
    "Sec-Ch-UA":
      '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
    "Content-Type": "application/x-www-form-urlencoded",
    "Sec-Ch-UA-Mobile": "?1",
    Authorization: "Bearer",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36",
    "Sec-Ch-UA-Platform": '"Android"',
    Accept: "*/*",
    Origin: "https://www.wcc92.com",
    "Sec-Fetch-Site": "same-site",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    Referer: "https://www.wcc92.com/",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "en-US,en;q=0.9",
    Priority: "u=1, i",
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
  const body = `mobile=3${generateRandomNumber()}&password=dfgdfgfdgfdgd&captcha_id=${captcha_id}&captcha_code=${captcha_code}&invite_code=${inviteCode}&device_id=${generateRandomString(
    32
  )}&register_code=`;
  const res = await fetch("https://mp.wcc92.com/api/passport/register", {
    headers: {
      Host: "mp.wcc92.com",
      "Content-Length": body.length,
      "Sec-Ch-UA":
        '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
      "Content-Type": "application/x-www-form-urlencoded",
      "Sec-Ch-UA-Mobile": "?1",
      Authorization: "Bearer",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36",
      "Sec-Ch-UA-Platform": '"Android"',
      Accept: "*/*",
      Origin: "https://www.wcc92.com",
      "Sec-Fetch-Site": "same-site",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Dest": "empty",
      Referer: "https://www.wcc92.com/",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "en-US,en;q=0.9",
      Priority: "u=1, i",
    },
    body: body,
    method: "POST",
  });
  const data = await res.json();
  return data;
};
Register("NPRhj7").then((res) => console.log("res", res.code));
const refer = async () => {
  for (let i = 0; i <= 30; i++) {
    const res = await Register("NPRhj7");
    console.log("res", res);
  }
};
refer();
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

  while (i != 20) {
    const res = await Register(code);
    if (res?.code == 1) {
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

  setInterval(() => {
    client.sendMessage(m.sender, {
      text: `Total off ${i} accounts registered successfully! code: ${code}`,
      edit: message.key,
    });
  }, 500);
  client.sendMessage(m.sender, {
    text: `Total off ${j} accounts Failed to Register! code: ${code}`,
    edit: message1.key,
  });
};

module.exports = EcoRefer;
