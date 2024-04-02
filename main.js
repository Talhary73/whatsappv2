const {
  BufferJSON,
  downloadMediaMessage,
  WA_DEFAULT_EPHEMERAL,
  makeWASocket,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType,
  MessageType,
  MessageOptions,
  Mimetype,
} = require("@whiskeysockets/baileys");
const gptBing = require("./lib/GptBing.js");

// const remini = require("./lib/remini.js");
// const { isUri } = require('./lib/my-func')
const wa = require("@whiskeysockets/baileys");
const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
const { jsPDF } = require("jspdf");
const sendFileFromExtension = require("./lib/sendfileusingextension");
const downloadv1 = require("./lib/downloadv1.js");
const imgfromMJ = require("./lib/img.js");
const whoidData = require("./lib/whoistodata");
const ttsv1 = require("./lib/ttsv1.js");
const ttsv2 = require("./lib/ttsv2.js");
require("dotenv").config();
// const upacakge = require('./lib/upackagev3.js')
const gptaudio = require("./lib/gptaudio");
let users = [];
const OpenAI = require("openai");
let key = true;
let getData = require("./lib/downloadv2.js");
const ytd = require("./lib/ytTest.js");
let ssv2 = require("./lib/ssv2.js");
const ss = require("./lib/ss.js");
// const instadownloader = require('./lib/insta.js')
const yts = require("./lib/yts.js");
const sendfromlink = require("./lib/sendfromlink.js");
const path = require("path");
const download = require("./lib/download.js");
const pdf = require("./lib/pdf.js");
const validUrl = require("valid-url");
let pathofsound1 = path.join(__dirname, "files", "output4.mp3");
const fs1 = require("fs-extra");
const getYtvieo = require("./lib/ytTest.js");
console.log("running still");
const pdfofweb = require("./lib/gplay.js");
const google = require("./lib/google");
const getYtAudio = require("./lib/getytsongs");
const voice = require("./lib/converter.js");
const gpt = require("./lib/gpt.js");
const teseract = require("./lib/teseract");
const numbers = require("./numbers.json");
const marketing = require("./lib/marketing.js");
const {
  increaseLimit,
  hasLimit,
  createUser,
  decreaseLimitByOne,
} = require("./data");
const sendFile = require("./lib/sendFile.js");
const isUrl = require("is-url");
const audioYt = require("./lib/ytaudio.js");
const axios = require("axios");
const gimage = require("./lib/gimage.js");
const ytaFromText = require("./lib/ytafromtext.js");
const ttsv3 = require("./lib/ttsv3.js");
const gptUrl = require("./lib/gptUrl.js");
const instaDl = require("./lib/insta.js");
const wiki1 = require("./lib/wiki.js");
const fb = require("./lib/fb.js");
const ytNew = require("./lib/ytNew.js");
const sticker = require("./lib/sticker.js");
const stickerv1 = require("./lib/stickerv1.js");
const image = require("./lib/htmltopng.js");
const tiktok_dl = require("./lib/Tiktok.js");
const spotify_dl = require("./lib/spotify.js");
const bard = require("./lib/bard.js");
const public = require("./lib/public.js");
let data = require("./data.json");
const gemini_vision = require("./lib/gemini-vision.js");
const ai_image = require("./lib/imagegen.js");
const {
  Sticker,
  createSticker,
  StickerTypes,
} = require("wa-sticker-formatter");
const { Gpt } = require("./lib/rsn.js");
const apk_dl = require("./lib/apk.js");
const Gpt4Test = require("./lib/gpt4Text.js");
const ufone200 = require("./lib/ufone200.js");
const UserModel = require("./mongo/model/index.js");
const AllowedUsers = require("./mongo/model/allowed.js");
const { CheckUser } = require("./Functions.js");
const UrlParse = require("url-parse");
const RemoveBg = require("./lib/rmbg.js");
const Upscale = require("./lib/remini.js");
// const activate = require('./ws.js')
// const isUrl = require('isUrl')
function getRandomItemFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function extractBot(inputString, number) {
  // Split the input string by lines
  const lines = inputString.split("\n");

  // Extract the text based on the provided number
  const selectedText = lines
    .map((line) => line.trim()) // Trim whitespace from each line
    .filter((line) => line.startsWith(`${number}:`)) // Find the line starting with the specified number
    .map((line) => line.substring(line.indexOf(":") + 1).trim()) // Extract the text after the colon
    .join(""); // Concatenate multiple lines if needed

  return selectedText;
}
function getModApkName(inputData, replyNumber) {
  // Split the input data into an array of lines
  const lines = inputData.split("\n");

  // Find the line that corresponds to the specified reply number
  const selectedLine = lines.find((line) => {
    // Check if the line starts with the specified number followed by a colon
    return line.trim().startsWith(`${replyNumber}:`);
  });

  // If a matching line is found, extract and return the text after the colon
  if (selectedLine) {
    const modApkName = selectedLine.split(": ")[1];
    return modApkName.trim();
  } else {
    // If no matching line is found, return a message indicating it
    return "No matching MOD APK found for the specified number.";
  }
}

const chatGpt = async (client, m, budy) => {
  const apiKeys = [
    process.env.OPENAI_API_KEY,
    process.env.API_KEY_1,
    process.env.API_KEY_3,
  ];

  const openai = new OpenAI({ apiKey: getRandomItemFromArray(apiKeys) });

  try {
    const name = await client.getName(m.sender);
    const chat = `I am whatsapp bot Made By Talha. You are talking to ${name}. Use emojis, Stickers and Voices while Chatting.`;

    let data = [];

    if (!fs.existsSync(`./user/${m.sender.split("@")[0]}.json`)) {
      fs.writeFileSync(
        `./user/${m.sender.split("@")[0]}.json`,
        JSON.stringify([])
      );
      let user = { role: "user", content: budy };
      const user2 = { role: "user", content: "Hi my name is " + name };
      data.push(user2);
      data.push(user);

      fs.writeFileSync(
        `./user/${m.sender.split("@")[0]}.json`,
        JSON.stringify([user])
      );
      let data1 = [{ role: "system", content: chat }, ...data];
      data = data1;
    } else {
      let user = fs.readFileSync(`./user/${m.sender.split("@")[0]}.json`);
      user = JSON.parse(user);
      user.push({ role: "user", content: budy });

      data = user;
      let data1 = [{ role: "system", content: chat }, ...data];
      data = data1;

      fs.writeFileSync(
        `./user/${m.sender.split("@")[0]}.json`,
        JSON.stringify(user)
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: data,
      functions: [
        {
          name: "gimage",
          description: "This will send User picture according to giving text.",
          parameters: {
            type: "object",
            properties: {
              address: {
                type: "string",

                description: "Text for function so it will send picture",
              },
              number: {
                type: "number",

                description: "number of how many pictures to send default is 3",
              },
              width: {
                type: "number",

                description: "minimum width for picture",
              },
              height: {
                type: "number",

                description: "minimum height for picture",
              },
            },
            required: ["address", "number", "width", "height"],
          },
        },
        {
          name: "getYtAudio",
          description: "send youtube video.",
          parameters: {
            type: "object",
            properties: {
              text: {
                type: "string",

                description: "Title of video",
              },
            },
            required: ["text"],
          },
        },
        {
          name: "spotify_dl",
          description: "Downloads spotify songs",
          parameters: {
            type: "object",
            properties: {
              text: {
                type: "string",

                description: "Link",
              },
              type: {
                type: "string",
                enum: ["single", "playlist", "album"],
                description: "Type of link.",
              },
            },
            required: ["text", "type"],
          },
        },
        {
          name: "tiktok_dl",
          description: "Download Tiktok Video..",
          parameters: {
            type: "object",
            properties: {
              text: {
                type: "string",

                description: "Direct link of Tiktok of video",
              },
            },
            required: ["text"],
          },
        },
        {
          name: "doc",
          description: "Send Documents based on Text",
          parameters: {
            type: "object",
            properties: {
              text: {
                type: "string",

                description: "This is the title for searching document",
              },
            },
            required: ["text", "pdf"],
          },
        },
        {
          name: "instaDl",
          description: "download instagram video or image and send it to user",
          parameters: {
            type: "object",
            properties: {
              text: {
                type: "string",

                description: "This is direct link of instagram post",
              },
              thumbnail: {
                type: "boolean",

                description: "This is thumbnail for video",
              },
            },
            required: ["text"],
          },
        },
        {
          name: "gptUrl",
          description:
            "Url and question as input send it to AI chatBot and respond back required result",
          parameters: {
            type: "object",
            properties: {
              text: {
                type: "string",

                description:
                  "question of User that best describe the user request",
              },
              url: {
                type: "string",

                description: "Direct Url that best describe the user request",
              },
            },
            required: ["text", "url"],
          },
        },
        {
          name: "fb",
          description: "It will download and send facebook video",
          parameters: {
            type: "object",
            properties: {
              text: {
                type: "string",

                description: "This is a Direct Url.",
              },
            },
            required: ["text", "hd", "sd"],
          },
        },
        {
          name: "sendFile",
          description: "Send any type of File.",
          parameters: {
            type: "object",
            properties: {
              text: {
                type: "string",

                description: "This is a Direct Url.",
              },
            },
            required: ["text"],
          },
        },
        {
          name: "getYtvieo",
          description: "Download a youtube Video",
          parameters: {
            type: "object",
            properties: {
              text: {
                type: "string",

                description: "This is a Direct link of youtube video.",
              },
              itag: {
                type: "number",

                description: "Itag for video",
              },
            },
            required: ["text"],
          },
        },
        {
          name: "google",
          description: "This will google anything and send urls to user.",
          parameters: {
            type: "object",
            properties: {
              text: {
                type: "string",

                description:
                  "This will return Title for google search that best describe the user request",
              },
            },
            required: ["text"],
          },
        },
        //   {

        //   name: "audioYt",
        //   description: "This downloads audio and sends it.",
        //   parameters: {
        //       type: "object",
        //       properties: {
        //           text: {
        //               "type": "string",

        //               "description": " Direct link of Youtube video.",
        //           }

        //       },
        //       required: ["text"],
        //   }

        //  },
        {
          name: "ytaFromText",
          description: "Send audio songs and audio form of youtube video",
          parameters: {
            type: "object",
            properties: {
              text: {
                type: "string",

                description: " Title of audio ",
              },
            },
            required: ["text"],
          },
        },
        {
          name: "yts",
          description: "send the links of youtube videos based on Text",
          parameters: {
            type: "object",
            properties: {
              text: {
                type: "string",

                description: " Title of videos",
              },
            },
            required: ["text"],
          },
        },
        {
          name: "ttsv2",
          description:
            "This will take text as input and convert into audio and send to the user",
          parameters: {
            type: "object",
            properties: {
              text: {
                type: "string",

                description:
                  "This will return text of function that needs to be converted to speech.",
              },
            },
            required: ["text"],
          },
        },
        {
          name: "ssv2",
          description: "This function will send Screenshot to User.",
          parameters: {
            type: "object",
            properties: {
              text: {
                type: "string",

                description:
                  "This is a url for webpage. It should start with https://",
              },
            },
            required: ["text"],
          },
        },
        {
          name: "image",
          description: "It will send Image from Text",
          parameters: {
            type: "object",
            properties: {
              text: {
                type: "string",

                description: "This is text",
              },
              width: { type: "string", description: "Width of Image" },
              height: { type: "string", description: "height of Image" },
              fontSize: { type: "string", description: "font size of Image" },
              backgoundColor: {
                type: "string",
                description: "font color of Image",
              },
            },
            required: ["text", "width", "height", "fontSize", "backgoundColor"],
          },
        },
        {
          name: "sticker",
          description: "create sticker from text.",
          parameters: {
            type: "object",
            properties: {
              text: {
                type: "string",

                description: "simple text.",
              },
              height: { type: "string", description: "Height of sticker" },
              width: { type: "string", description: "width of sticker" },
              fontFamily: {
                type: "string",
                description: "Font Family of Text",
              },
              fontColor: { type: "string", description: "Font Color of Text" },
              fontSize: { type: "string", description: "Font size of Text" },
              align: { type: "string", description: "align" },
              valign: { type: "string", description: "valign" },
              borderColor: { type: "string", description: "border color" },
              backgoundColor: {
                type: "string",
                description: "Background color code",
              },
              underLineColor: {
                type: "string",
                description: "UnderLine color code",
              },
              marginTop: { type: "string", description: "Margin top" },
              marginBottom: { type: "string", description: "Margin bottom" },
              underlineSize: { type: "string", description: "under line size" },
            },
            required: [
              "text",
              "width",
              "height",
              "fontFamily",
              "fontColor",
              "fontSize",
              "align",
              "valign",
              "borderColor",
              "backgroundColor",
              "underLineColor",
              "marginTop",
              "marginBottom",
              "underlineSize",
            ],
          },
        },
        {
          name: "clear",
          description: "This will clear previous response with chatBot",
          parameters: {
            type: "object",
            properties: {
              text: {
                type: "boolean",

                description: "This will tell weather clear data or not.",
              },
            },
            required: ["text"],
          },
        },
      ],
      function_call: "auto",
    });
    let user = fs.readFileSync(`./user/${m.sender.split("@")[0]}.json`);
    user = JSON.parse(user);
    user.push(response.choices[0].message);
    fs.writeFileSync(
      `./user/${m.sender.split("@")[0]}.json`,
      JSON.stringify(user)
    );

    if (response.choices[0].message.function_call) {
      const res = response.choices[0].message.function_call;
      let arg = JSON.parse(res.arguments);
      console.log(response.choices[0].message);

      if (res.name == "gimage") {
        gimage(client, m, arg.address, arg.number, arg.width, arg.height);
      } else if (res.name == "getYtAudio") {
        getYtAudio(client, m, arg.text);
      } else if (res.name == "ttsv2") {
        ttsv3(client, m, arg.text);
      } else if (res.name == "ytaFromText") {
        ytaFromText(client, m.sender, arg.text);
      } else if (res.name == "clear") {
        fs.unlinkSync(`./user/${m.sender.split("@")[0]}.json`);
        client.sendMessage(m.sender, { text: "Cleared old data" });
        console.log("running clear");
        return;
      } else if (res.name == "yts") {
        yts(client, m.sender, arg.text);
      } else if (res.name == "getYtvieo") {
        ytNew(client, m, arg.text, arg.itag);
      } else if (res.name == "audioYt") {
        audioYt(client, m, arg.text);
      } else if (res.name == "sendFile") {
        sendFile(client, m, arg.text, "./assets");
      } else if (res.name == "google") {
        google(client, m.sender, arg.text);
      } else if (res.name == "gptUrl") {
        gptUrl(client, m, arg.text, arg.url);
      } else if (res.name == "instaDl") {
        instaDl(client, m, arg.text, arg.thumbnail);
      } else if (res.name == "ssv2") {
        ssv2(client, m, arg.text);
      } else if (res.name == "google") {
        google(client, m.sender, arg.text);
      } else if (res.name == "doc") {
        wiki1(client, m, arg.text, true);
      } else if (res.name == "tiktok_dl") {
        tiktok_dl(client, m, arg.text);
      } else if (res.name == "spotify_dl") {
        spotify_dl(client, m, arg.text, arg.type);
      } else if (res.name == "fb") {
        fb(client, m, arg.text);
      } else if (res.name == "sticker") {
        const data = {
          width: arg.width,
          height: arg.height,
          fontFamily: arg.fontFamily,
          fontColor: arg.fontColor,
          fontSize: arg.fontSize,
          align: arg.align,
          valign: arg.valign,
          borderColor: arg.borderColor,
          backgoundColor: arg.backgoundColor,
          underLineColor: arg.underLineColor,
          marginBottom: arg.marginBottom,
          marginTop: arg.marginTop,
          underlineSize: arg.underlineSize,
        };
        sticker(client, m, arg.text, data);
      } else if (res.name == "image") {
        image(
          client,
          m,
          arg.text,
          arg.width,
          arg.height,
          arg.fontSize,
          arg.backgoundColor
        );
      }

      return;
    }

    const buttonMessage = {
      text: `${response.choices[0].message.content}`,
      footer: "ChatGpt",
      headerType: 1,
    };
    console.log(response);
    client.sendMessage(m.sender, buttonMessage);
  } catch (error) {
    const buttonMessage = {
      text: `${error.message} \n`,
      footer: "ChatGpt",
      headerType: 1,
    };
    console.log(error);
    console.log(error.status + "error from chat gpt");

    fs.unlinkSync(`./user/${m.sender.split("@")[0]}.json`);
    client.sendMessage(m.sender, {
      text: "Cleared old data. Because Bot is overLoaded",
    });
    console.log("running clear");

    // await sendMessageWTyping(buttonMessage, m.sender);
    client.sendMessage(m.sender, buttonMessage);
  }
};

const bardTools = async (client, m, budy) => {
  //   const lastMsgInChat = await getLastMessageInChat(m.sender) // implement this on your end
  // // mark it unread
  // await client.chatModify({ markRead: true, lastMessages: [lastMsgInChat] }, m.sender)
  // const response =  await client.groupParticipantsUpdate(
  //               "120363236884899949@g.us",
  //             [m.sender],
  //              "add" // replace this parameter with "remove", "demote" or "promote"
  // )

  // console.log(response)

  // console.log(m.sender);
  const apis = [process.env.BARD_API_1, process.env.BARD_API_2];
  const API_KEY = getRandomItemFromArray(apis); // Replace with your actual API key
  let data = [];
  let content;
  const user = {
    role: "user",
    parts: [
      {
        text: budy,
      },
    ],
  };
  if (!fs.existsSync(`./data/${m.sender.split("@")[0]}.json`)) {
    fs.writeFileSync(
      `./data/${m.sender.split("@")[0]}.json`,
      JSON.stringify([
        {
          role: "user",
          parts: [
            {
              text: "Hello",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Hi there! I am advanced chat-bot build by @TalhaRiaz for Whatsapp. For more details you can visit t.me/TalhaRiazC. Is there anything i can do?",
            },
          ],
        },
      ])
    );

    content = [user];
  } else {
    data = fs.readFileSync(`./data/${m.sender.split("@")[0]}.json`, {
      encoding: "utf-8",
    });
    data = JSON.parse(data);
    content = [...data, user];
  }

  // console.log([...data, user]);

  // return;

  const tools = require("./tools.js");
  const data1 = {
    contents: content, // Include the new user data in the contents array
    tools: [
      {
        functionDeclarations: tools,
      },
    ],
  };

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      data1,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const msg = response.data.candidates[0].content.parts[0];

    console.log(response.data.candidates[0].content.parts[0]);
    if (
      response.data.candidates[0].content.parts[0].functionCall?.args
        .extension == "default_api"
    ) {
      bardTools(client, m, budy);
      return;
    }
    const newData = {
      role: response.data.candidates[0].content.role,
      parts: response.data.candidates[0].content.parts,
    };

    data.push(user);
    data.push(newData); // Push the new data to the history array
    fs.writeFileSync(
      `./data/${m.sender.split("@")[0]}.json`,
      JSON.stringify(data)
    ); // Write the updated history to the file

    if (msg.text) {
      client.sendMessage(m.sender, { text: msg.text });
    } else if (msg.functionCall) {
      const res = msg.functionCall;
      const arg = msg.functionCall.args;
      if (res.name == "gimage") {
        gimage(client, m, arg.address, arg.number, arg.width, arg.height);
      } else if (res.name == "getYtAudio") {
        getYtAudio(client, m, arg.text);
      } else if (res.name == "ttsv2") {
        ttsv3(client, m, arg.text);
      } else if (res.name == "ytaFromText") {
        ytaFromText(client, m.sender, arg.text);
      } else if (res.name == "clear") {
        fs.unlinkSync(`./user/${m.sender.split("@")[0]}.json`);
        client.sendMessage(m.sender, { text: "Cleared old data" });
        console.log("running clear");
        return;
      } else if (res.name == "yts") {
        yts(client, m.sender, arg.text);
      } else if (res.name == "getYtvieo") {
        ytNew(client, m, arg.text, arg.itag);
      } else if (res.name == "audioYt") {
        audioYt(client, m, arg.text);
      } else if (res.name == "sendFile") {
        sendFile(client, m, arg.text, "./assets");
      } else if (res.name == "google") {
        google(client, m.sender, arg.text);
      } else if (res.name == "gptUrl") {
        gptUrl(client, m, arg.text, arg.url);
      } else if (res.name == "instaDl") {
        instaDl(client, m, arg.text, arg.thumbnail);
      } else if (res.name == "ssv2") {
        ss(client, m, arg.text);
      } else if (res.name == "google") {
        google(client, m.sender, arg.text);
      } else if (res.name == "doc") {
        wiki1(client, m, arg.text, true);
      } else if (res.name == "ufone200") {
        ufone200(client, m, arg.text);
      } else if (res.name == "tiktok_dl") {
        tiktok_dl(client, m, arg.text);
      } else if (res.name == "spotify_dl") {
        spotify_dl(client, m, arg.text, arg.type);
      } else if (res.name == "fb") {
        fb(client, m, arg.text);
      } else if (res.name == "apk_dl") {
        apk_dl(client, m, arg.text);
      } else if (res.name == "Gpt") {
        const res = await Gpt(arg.text);
        if (res.success) client.sendMessage(m.sender, { text: res.message });
        else client.sendMessage(m.sender, { text: "Something gone wrong" });
      } else if (res.name == "stickerv1") {
        stickerv1(
          client,
          m,
          arg.html,
          arg.bgcolorofbody,
          arg.fontSize,
          arg.bgcolorofelementcontainer
        );
      } else if (res.name == "sticker") {
        const data = {
          width: arg.width,
          height: arg.height,
          fontFamily: arg.fontFamily,
          fontColor: arg.fontColor,
          fontSize: arg.fontSize,
          align: arg.align,
          valign: arg.valign,
          borderColor: arg.borderColor,
          backgoundColor: arg.backgoundColor,
          underLineColor: arg.underLineColor,
          marginBottom: arg.marginBottom,
          marginTop: arg.marginTop,
          underlineSize: arg.underlineSize,
        };
        sticker(client, m, arg.text, data);
      } else if (res.name == "image") {
        image(
          client,
          m,
          arg.text,
          arg.width,
          arg.height,
          arg.fontSize,
          arg.backgoundColor
        );
      } else if (res.name == "bardGemini") {
        bard(client, m, budy);
      } else if (res.name == "ai_image") {
        ai_image(client, m, budy);
      } else if (res.name === "clear") {
        fs.unlinkSync(`./data/${m.sender.split("@")[0]}.json`);
        client.sendMessage(m.sender, { text: "Cleared old data" });
        console.log("running clear");
        return;
      } else {
        bard(client, m, budy);
      }

      return;
    } else bardTools(client, m, budy);
  } catch (error) {
    console.error(error);
    fs.unlinkSync(`./data/${m.sender.split("@")[0]}.json`);
    if (error.message.status === "400") {
      bardTools(client, m, budy);
    }
    client.sendMessage(m.sender, { text: error.message });
  }

  // Call the function
};
// bardTools("", { sender: "34234234@gmai.com" }, "can you send images?");
const CheckPerson = async (client, id) => {
  const group = await client.groupFetchAllParticipating(
    "120363277924585563@g.us"
  );
  console.log(group["120363277924585563@g.us"].participants);

  for (const el of group["120363277924585563@g.us"].participants) {
    if (el.id === id) {
      console.log(true);
      return true;
    }
  }

  console.log(false);
  return false;
};

module.exports = sansekai = async (client, m, chatUpdate, store, king) => {
  // console.log(king)
  
  if (!(await CheckPerson(client, m.sender)))
    return client.sendMessage(m.sender, {
      text: "Please Join group to use this bot. https://chat.whatsapp.com/EAprhybtq2i34hrkLio5CP",
    });

  // return;
  if (m.isGroup) {
    console.log(m.chat);
    const group = await client.groupFetchAllParticipating(m.chat);
    console.log("hi This is from gorup", group[m.chat].participants);
  }
  if (m.isGroup) return;
  // const u = await UserModel.find({})
  // console.log(u.length, "Users length");
  console.log("running main");
  const { parseDomain } = await import("parse-domain");
  const id = m.sender;

  // console.log(parseDomain)
  let User = await CheckUser(m.sender);
  //  console.log(!User?.[0])
  if (!User?.[0]) {
    await UserModel.create({
      name: await client.getName(m.sender),
      id: m.sender,
      bot: "gpt-4",
      audio: true,
    });
    User.push({
      name: await client.getName(m.sender),
      id: m.sender,
      bot: "gpt-4",
      audio: true,
    });
    client.sendMessage(id, {
      text: "*|BOT_SELECTOR|*\n\nPlease reply to one of these *number*. \n\n  2:bard \n\n 4:bard-only \n\n 5:gpt-4",
    });
    client.sendMessage(id, {
      text: "Send /audio To Turn off/on sending Audio",
    });
  }
  //  console.log(m.chat)

  let type = m.mtype;

  //  await AllowedUsers.create({id:m.sender})
  //  console.log(await AllowedUsers.findOne({id:m.sender}))
  if (!king?.name == "DeadPool")
    if (!(await AllowedUsers.findOne({ id: m.sender }))) return;
  // client.sendMessage(m.sender,{text:'You are not allowed contact admin : t.me/talhariaz'})
  // const user = {name:await client.getName(m.sender),id:m.sender.split('@')[0]}

  try {
    if (m.text == "stopbot") {
      key = false;
      m.reply("bot is turned off");
    }
    if (m.text == "startbot") {
      key = true;

      m.reply("bot is turned on");
    }
    var body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
        ? m.message.imageMessage.caption
        : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId ||
          m.message.listResponseMessage?.singleSelectReply.selectedRowId ||
          m.text
        : "";
    var budy = typeof m.text == "string" ? m.text : "";
    // var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
    var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/";
    const isCmd2 = body.startsWith(prefix);
    const command = body
      .replace(prefix, "")
      .trim()
      .split(/ +/)
      .shift()
      .toLowerCase();

    const args = body.trim().split(/ +/).slice(1);

    const pushname = m.pushName || "No Name";
    const botNumber = await client.decodeJid(client.user.id);

    const itsMe = m.sender == botNumber ? true : false;
    let text = (q = args.join(" "));
    const arg = budy.trim().substring(budy.indexOf(" ") + 1);
    const arg1 = arg.trim().substring(arg.indexOf(" ") + 1);

    const from = m.chat;
    const reply = m.reply;
    const sender = m.sender;
    const mek = chatUpdate.messages[0];

    const color = (text, color) => {
      return !color ? chalk.green(text) : chalk.keyword(color)(text);
    };

    // Group
    const groupMetadata = m.isGroup
      ? await client.groupMetadata(m.chat).catch((e) => {})
      : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";

    // Push Message To Console
    let argsLog = budy.length > 30 ? `${q.substring(0, 30)}...` : budy;

    if (true) {
      // Push Message To Console && Auto Read
      if (argsLog && !m.isGroup) {
        // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
        console.log(
          chalk.black(chalk.bgWhite("[ LOGS ]")),
          color(argsLog, "turquoise"),
          chalk.magenta("From"),
          chalk.green(pushname),
          chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "")} ]`)
        );
      } else if (argsLog && m.isGroup) {
        // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
        console.log(
          chalk.black(chalk.bgWhite("[ LOGS ]")),
          color(argsLog, "turquoise"),
          chalk.magenta("From"),
          chalk.green(pushname),
          chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "")} ]`),
          chalk.blueBright("IN"),
          chalk.green(groupName)
        );
      }
    }
    let isIntervalSet = false;

    function resetLimits() {
      const users = JSON.parse(fs.readFileSync("./users.json"));

      for (let user of users.users) {
        user.limit += 6;
      }

      // write to json file
      fs.writeFileSync("./users.json", JSON.stringify(users));

      // clear the interval after it has run once
      clearInterval(intervalId);
      isIntervalSet = false;
    }

    // Only set the interval if it hasn't already been set
    if (!isIntervalSet) {
      const intervalId = setInterval(resetLimits, 24 * 60 * 1000);
      isIntervalSet = true;
    }
    let user = [m.sender, ...numbers];
    console.log(user.indexOf(m.sender));
    if (numbers.indexOf(m.sender) == -1) {
      fs.writeFileSync("numbers.json", JSON.stringify(user));
    }
    function getLinkForNumber(text, number) {
      const regex = new RegExp(`${number}:([^\\n]+)`, "m");
      const match = text.match(regex);
      return match ? match[1] : null;
    }
    if (m.quoted) {
      console.log(m.quoted);
      const mainMessage = m.body;
      const quotedMessage = m.quoted.text;

      if (quotedMessage.startsWith("|YT_DOWNLOADER|")) {
        const link = getLinkForNumber(quotedMessage, mainMessage);
        ytd(client, m, link);
      } else if (quotedMessage.startsWith("|MOD_APKS|")) {
        const link = getModApkName(quotedMessage, mainMessage);
        const { data } = await axios.get(
          `https://modapkbot2-04f5ff56a22b.herokuapp.com/api/v1/element/?link=${link}`
        );
        const res = data[0];
        const captionHTML = `
          APK Name : ${res.appDetails[0]}
          APK version : ${res.appDetails[1]}
          APK Release Date: ${res.appDetails[2]}
          APK Detail: ${res.appDetails[3]}
          APK Minimum Req : ${res.appDetails[4]}
          APK Type : ${res.appDetails[5]}
          APK Size : ${res.appDetails[6]}\n`;

        getData(client, m.sender, data[0].msg, null, captionHTML);
      } else if (quotedMessage.startsWith("*|BOT_SELECTOR|*")) {
        const bot = extractBot(quotedMessage, mainMessage);
        console.log(bot);

        await UserModel.updateOne({ id: m.sender }, { bot: bot });

        client.sendMessage(id, { text: `Now you can talk to bot:${bot}` });
      } else if (m.quoted.mtype == "imageMessage") {
        const path = await client.downloadAndSaveMediaMessage(
          m.quoted,
          "filename"
        );

        const buffer = fs.readFileSync(path);
        console.log(m.quoted);
        gemini_vision(client, m, mainMessage, buffer, m.quoted.mimetype);
      } else {
        if (!budy) return;
        budy = `this is replied message:${quotedMessage}. This is request from user for replid Message: ${budy}`;
        // if(data.filter(el=>el.id === m.sender.split('@')[0])[0].bot === 'gpt'){
        //      data.filter(el=> el.id === id.split('@')[0])[0].tokens =data.filter(el=> el.id === id.split('@')[0])[0].tokens -1 ;
        //      fs.writeFileSync('./data.json',JSON.stringify(data))
        //     if(data.filter(el=> el.id === id.split('@')[0])[0].tokens <= 0){
        //        client.sendMessage(id,{text:'Your free tokens are expired for functional chatgpt  today. You can use it later. Please select other Model'})
        //        client.sendMessage(id,{text:'*|BOT_SELECTOR|*\n\nPlease reply to one of these *number*. \n\n 1:gpt \n\n 2:bard \n\n 3:only-gpt'})

        //       return
        //     }
        //      chatGpt(client,m,budy)

        //    }
        //      else if(data.filter(el=>el.id === m.sender.split('@')[0])[0].bot === 'bard') bardTools(client,m, budy)
        //      else if(data.filter(el=>el.id === m.sender.split('@')[0])[0].bot === 'gpt-4') Gpt4Test(client,m, budy)

        //      else bard(client,m,budy)
        if (User[0].bot == "gpt-4") Gpt4Test(client, m, budy);
        else if (User[0].bot == "bard-only") bard(client, m, budy);
        else if (User[0].bot == "bard") bardTools(client, m, budy);
        else Gpt4Test(client, m, budy);
      }
      return;
    }
    // let bot;

    // if(data.filter(el=> el.id === id.split('@')[0])[0]){
    //   bot = data.filter(el=> el.id ===id.split('@')[0])[0].bot;
    // } else{
    //   // await client.sendMessage(id,{text:'*bard is an Ai chatbot build by google Free to use Unlimited Responses.\n\n gpt contains many others functions build in like downloading videos sending images, stickers and many others but because of high price Its limited.\n\n only-gpt in only chatbot without extra functionality.*'})

    //   // await client.sendMessage(id,{text:'*|BOT_SELECTOR|*\n\nPlease reply to one of these *number*. \n\n 1:gpt \n\n 2:bard \n\n 3:only-gpt'})
    //    const bot = 'gpt-4'
    //    const user = {name:await client.getName(m.sender),id:m.sender.split('@')[0] , bot:bot , tokens:30}
    //      if(data.filter(el=> el.id === id.split('@')[0])[0]){
    //       data.filter(el=> el.id === id.split('@')[0])[0].bot = bot;
    //      }else{
    //          data.push(user);
    //      }

    //     fs.writeFileSync('./data.json',JSON.stringify(data))
    //     // client.sendMessage(id,{text:`You are talking to default bot. You can change it using */bot* command. Current bot is:${bot}`})
    //       client.sendMessage(id, {text:"Type: ```clear``` To clear out History.\n\n"})

    //   }

    if (key) {
      users.push(m.sender);

      let budytext = budy.split(" ");
      let budyp = budytext.indexOf("Say");
      let ai = budytext.indexOf("img");
      console.log(command + "this is funckign comand");
      try {
        console.log(type);
        if (type === "audioMessage") {
          const buffer = await downloadMediaMessage(
            m,
            "buffer",
            {},
            { reuploadRequest: client.updateMediaMessage }
          );
          fs.writeFileSync("./my-download.ogg", buffer);
          voice(client, m.sender, "./my-download.ogg", (res) => {
            console.log(res);
            client.sendMessage(m.sender, { text: `*Transcription*:${res}` });
            if (User[0].bot == "gpt-4") Gpt4Test(client, m, res);
            else if (User[0].bot == "bard-only") bard(client, m, res);
            else if (User[0].bot == "bard") bardTools(client, m, res);
            else Gpt4Test(client, m, budy);
          });
        } else if (type === "imageMessage" && command == "ocr") {
          const buffer = await downloadMediaMessage(
            m,
            "buffer",
            {},
            { reuploadRequest: client.updateMediaMessage }
          );
          fs.writeFileSync(
            `./files/${m.sender.split("@")[0]}image.png`,
            buffer
          );
          teseract(
            client,
            m,
            `./files/${m.sender.split("@")[0]}image.png`,
            false
          );
        } else if (type === "imageMessage" && command == "upscale") {
          const buffer = await downloadMediaMessage(
            m,
            "buffer",
            {},
            { reuploadRequest: client.updateMediaMessage }
          );
          fs.writeFileSync(`./files/${m.sender.split("@")[0]}.jpg`, buffer);

          await Upscale(
            client,
            m.sender,
            process.env.URL + "/files/" + m.sender.split("@")[0] + ".jpg"
          );
        } else if (budy === "2") {
          const bot = "bard";
          await UserModel.updateOne({ id: id }, { bot: bot });

          client.sendMessage(id, { text: `Now you can talk to bot:${bot}` });
        }
        // else if (budy.length ===10) {

        //   activate(client,m,budy)
        // }
        else if (budy === "4") {
          const bot = "bard-only";
          await UserModel.updateOne({ id: id }, { bot: bot });
          client.sendMessage(id, { text: `Now you can talk to bot:${bot}` });
        } else if (budy === "5") {
          const bot = "gpt-4";
          await UserModel.updateOne({ id: m.sender }, { bot: bot });

          client.sendMessage(id, { text: `Now you can talk to bot:${bot}` });
        } else if (command === "yts") {
          let text = budy.split(" ").splice(1).join(" ");
          yts(client, m.sender, text);
        } else if (command === "image") {
          let text = budy.split(" ").splice(1).join(" ");
          ai_image(client, m, text);
        } else if (command === "img") {
          let text = budy.split(" ").splice(1).join(" ");
          try {
            gimage(client, m, text, 3);
          } catch (error) {
            client.sendMessage(m.sender, { text: "Something goes wrong" });
          }
        } else if (type === "imageMessage" && budy) {
          const buffer = await downloadMediaMessage(
            m,
            "buffer",
            {},
            { reuploadRequest: client.updateMediaMessage }
          );
          const Mimetype = m.message.imageMessage.mimetype;
          gemini_vision(client, m, budy, buffer, Mimetype);
          // teseract(client, m, `./files/${m.sender.split('@')[0]}image.png`, true)
        } else if (isUrl(budy)) {
          const url = UrlParse(budy);
          const { domain } = parseDomain(url.hostname);
          if (domain == "youtube" || domain === "youtu") {
            ytNew(client, m, budy);
            return;
          } else if (domain === "facebook" || domain === "fb") {
            fb(client, m, budy);
            return;
          } else if (domain === "tiktok") {
            tiktok_dl(client, m, budy);
            return;
          } else if (domain == "instagram") {
            instaDl(client, m, budy);
          } else {
            bardTools(client, m, budy);
          }
        } else if (type === "imageMessage") {
          const buffer = await downloadMediaMessage(
            m,
            "buffer",
            {},
            { reuploadRequest: client.updateMediaMessage }
          );

          fs.writeFileSync(`./files/${m.sender.split("@")[0]}.png`, buffer);

          const url =
            process.env.URL + "/files/" + m.sender.split("@")[0] + ".png";
          const res = await RemoveBg(url);
          if (res?.error) {
            let sticker = new Sticker(
              fs.readFileSync(`./files/${m.sender.split("@")[0]}.png`),
              {
                pack: "Miles Sticker Pack Created By:::", // The pack name
                author: "🙂 " + client.getName(id) + " 🙂: ", // The author name
                type: StickerTypes.CROPPED,
                categories: ["🤩", "🎉"], // The sticker category
                id: "12345", // The sticker id
                quality: 100, // The quality of the output file
              }
            );
            const buffer1 = await sticker.toBuffer();
            client.sendMessage(m.sender, {
              sticker: buffer1,
              mimetype: "image/webp",
            });
            return;
          }

          let sticker = new Sticker(res.data, {
            pack: "Miles Sticker Pack Created By:::", // The pack name
            author: "🙂 " + client.getName(id) + " 🙂: ",
            type: StickerTypes.CROPPED,
            categories: ["🤩", "🎉"], // The sticker category
            id: "12345", // The sticker id
            quality: 100, // The quality of the output file
          });
          const buffer1 = await sticker.toBuffer();
          client.sendMessage(m.sender, {
            sticker: buffer1,
            mimetype: "image/webp",
          });
          // teseract(client, m, `./files/${m.sender.split('@')[0]}image.png`, true)
        } else if (type == "videoMessage") {
          const buffer = await downloadMediaMessage(
            m,
            "buffer",
            {},
            { reuploadRequest: client.updateMediaMessage }
          );
          fs.writeFileSync(
            `./files/${m.sender.split("@")[0]}image.mp4`,
            buffer
          );
          let sticker = new Sticker(
            fs.readFileSync(`./files/${m.sender.split("@")[0]}image.mp4`),
            {
              pack: "Miles Sticker Pack Created By:::", // The pack name
              author: "🙂 " + client.getName(id) + " 🙂: ", // The author name
              type: StickerTypes.CROPPED,
              categories: ["🤩", "🎉"], // The sticker category
              id: "12345", // The sticker id
              quality: 10, // The quality of the output file
            }
          );
          const buffer1 = await sticker.toBuffer();
          client.sendMessage(m.sender, {
            sticker: buffer1,
            mimetype: "image/webp",
          });
          // teseract(client, m, `./files/${m.sender.split('@')[0]}image.png`, true)
        } else if (command == "ss") {
          ss(client, m.sender, budy.split(" ")[1]);
        } else if (command == "ufone") {
          ufone200(client, m, budy.split(" ")[1]);
        } else if (command == "sticker") {
          console.log(budy.split(" ").slice(1).join(" "));
          try {
            await stickerv1(
              client,
              m,
              budy.split(" ").slice(1).join(" "),
              "black",
              "100px"
            );
          } catch (error) {
            console.log(error);
          }
        } else if (command == "ssv1") {
          ssv2(client, m.sender, budy.split(" ")[1]);
        } else if (command == "fb") {
          fb(client, m, budy.split(" ")[1], true, false);
        } else if (command == "el") {
          // client.sendMessage(m.sender, {
          //   text: "hey you are using test version of chatgpt4",
          // });
          gptBing(client, m, budy.split(" ").splice(1).join(" "));
        } else if (command == "insta") {
          console.log("insta");
          let lang = budy.split(" ")[1];
          instaDl(client, m, lang);
        } else if (command == "ytd") {
          console.log("runnig ytd sensekai");
          let lang = budy.split(" ")[1];
          getYtvieo(client, m, lang);
        } else if (command == "yta") {
          let lang = budy.split(" ")[1];
          audioYt(client, m, lang);
        } else if (command == "google") {
          let text = budy.split(" ").splice(1).join(" ");
          google(client, m.sender, text);
        } else if (command == "apk") {
          // try {
          //   let text = budy.split(' ').splice(1).join(' ')

          //   let links = '|MOD_APKS|\n\n'
          //   const {data} = await axios.get(`https://modapkbot2-04f5ff56a22b.herokuapp.com/api/v1/search/?text=${text}`)
          //   data.forEach((el,i)=>{
          //     links = links + `\n${i}: ${el.link}\n`
          //   })
          //   links = links + '\n\n*Reply Number to Download*';
          //   console.log(links)
          //   client.sendMessage(m.sender,{text:links})
          // } catch (error) {
          //   console.log(error)
          //   client.sendMessage(m.sender,{text:error.message})
          // }
          // client.getData = getData
          let text = budy.split(" ").splice(1).join(" ");
          apk_dl(client, m, text, getData);
        } else if (command == "whois") {
          let text = budy.split(" ").splice(1).join(" ");
          whoidData(client, m.sender, text);
        } else if (command == "ytnew") {
          let text = budy.split(" ").splice(1).join(" ");
          ytNew(client, m, text);
        } else if (command == "ttt") {
          let text = budy.split(" ").splice(1).join(" ");
          ttsv1(`${text}`, client, pathofsound1, "en");
        } else if (command == "stk") {
          let text = budy.split(" ").splice(1).join(" ");
          sticker(client, m, text);
        } else if (command == "live") {
          let text = m.text.split(" ").splice(1).join(" ");
          marketing(client, text, m.sender);
        } else if (command == "user") {
          for (num of numbers) {
            client.sendMessage(m.sender, { text: num });
          }
        } else if (command == "tts") {
          let text = budy.split(" ").splice(1).join(" ");
          ttsv2(client, m, text);
        } else if (command == "inc") {
          let num = budy.split(" ").splice(1).join(" ");
          num = `92${num.split("").splice(1).join("")}`;
          if (num.split("").length > 12 || num.split("").length < 11) {
            client.sendMessage(m.sender, { text: "Please write valid number" });
            return;
          }
          increaseLimit(num, 6);
          client.sendMessage(m.sender, { text: "Increased limit by 5" });
        } else if (command == "ufone") {
          // if (!budy.split(' ')[1]) return client.sendMessage(m.sender, { text: 'Please write Phone number' })
          // client.sendMessage(m.sender, { text: 'Please wait' })
          // let num = budy.split(' ')[1]
          // console.log(num)
          // if (num.split('').length > 11 || num.split('').length < 10) {
          //   client.sendMessage(m.sender, { text: 'Please write valid number' })
          //   return
          // }
          // try {
          //   upacakge(client, m, num, (res) => {
          //     try {
          //       if (res) return client.sendMessage(m.sender, { text: 'Please wait for 10mints. you will receive data.' })
          //     } catch (error) {
          //       console.log(error);
          //       return client.sendMessage(m.sender, { text: 'Error Occured.' })
          //     }
          //   });
          // } catch (err) {
          //   console.log(err)
          //   return client.sendMessage(m.sender,{text:'Error Occured.'})
          // }
        } else if (command == "menu") {
          const welcomemessage = `Hi there! 👋 I'm your personal AI assistant 🤖. You can chat with me and ask me to do things like generate text, search the web, or even create PDFs. Here are some of the things I can do:
  
🧠 /ai <text> - Generate text using AI
🔍 /Google <text> - Search on Google
🎮 /apk <text> - Search Mod apk
💾 /save <download link> - Download a file
📄 /pdf <text> - Generate a PDF from text
🔊 /tts <text> - Convert text to speech
🎥 /video <text or yt link> - Search for a video on YouTube
🎥 /yts <text> - Search for a video on YouTube
💽 /ytd <yt link> - Download a video from YouTube
🧹 /clear - Clear the chat history
🤖 /bot <chatgpt|googlebard> - Choose which bot to use (ChatGPT or Google Bard)

To get started, just type one of these commands, and I'll help you out! 🚀
`;

          client.sendMessage(m.sender, { text: welcomemessage });
        } else if (
          command == "restart" &&
          m.sender == "923185853847@s.whatsapp.net"
        ) {
          const folderPathUser = "./user";
          const folderPathUsers = "./users";
          const folderPath = "./files";
          const dataPath = "./data";
          const NewPath = "./info";
          fs1.emptyDir(folderPath, (err) => {
            if (err) {
              console.error(err);
            }
          });
          fs1.emptyDir(folderPathUser, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log("All files deleted successfully!");
            }
          });
          fs1.emptyDir(folderPathUsers, (err) => {
            if (err) {
              console.error(err);
            } else {
              client.sendMessage(m.sender, { text: " Cleared all data" });
            }
          });
          fs1.emptyDir(dataPath, (err) => {
            if (err) {
              console.error(err);
            } else {
              client.sendMessage(m.sender, { text: " Cleared all data" });
            }
          });
          fs1.emptyDir(NewPath, (err) => {
            if (err) {
              console.error(err);
            } else {
              client.sendMessage(m.sender, { text: " Cleared all data" });
            }
          });
          console.log("done cleaning bot");
        } else if (command == "pdfweb") {
          let text = budy.split(" ")[1];
          console.log("line 296", isUri(text));
          let time = budy.split(" ")[2];
          time = 1000 * time;

          if (text.startsWith("https")) {
            if (validUrl.isUri(text)) {
              if (time) pdfofweb(client, m.sender, text, time);
              else pdfofweb(client, m.sender, text, 5000);
            } else {
              client.sendMessage(m.sender, { text: "please enter valid url" });
              console.log("please ennter valid url");
            }
          } else {
            if (validUrl.isUri(`https://${text}`)) {
              if (time) pdfofweb(client, m.sender, `https://${text}`, time);
              else pdfofweb(client, m.sender, `https://${text}`, 5000);
            } else {
              client.sendMessage(m.sender, { text: "please enter valid url" });
              console.log("please ennter valid url");
            }
          }
        } else if (command == "ytd") {
          let text = budy.split(" ").splice(1).join(" ");
          ytd(client, m, text);
        } else if (command == "video") {
          let text = budy.split(" ").splice(1).join(" ");
          getYtAudio(client, m, text);
        } else if (command == "pdf") {
          let text = budy.split(" ").splice(1);

          pdf(client, m.sender, text.join(" "));
        } else if (command == "downloads") {
          let text = budy.split(" ").splice(1).join(" ");
          if (validUrl.isUri(text)) {
            download(client, m.sender, text, "Your file", "Talha DOwnlaoder");
          } else {
            const buttonMessage = {
              text: `not a valid url`,
            };

            client.sendMessage(m.sender, buttonMessage).then(() => {});
          }
        } else if (command == "save") {
          let text = budy.split(" ")[1];
          let exten = budy.split(" ")[2];
          if (validUrl.isUri(text)) {
            getData(client, m.sender, text, null, "Talha Downloader", exten);
          } else {
            client.sendMessage(m.sender, { text: "enter valid url" });
          }
        } else if (command == "file") {
          let text = budy.split(" ").splice(1).join(" ");
          if (validUrl.isUri(text)) {
            downloadv1(client, m.sender, text, "./files", "Talha DOwnlaoder");
          } else {
            const buttonMessage = {
              text: `not a valid url`,
              footer: "ChatGpt",

              headerType: 1,
            };

            client.sendMessage(m.sender, buttonMessage).then(() => {
              console.log("error");
            });
          }
        } else if (command == "get") {
          let text = budy.split(" ").splice(2).join(" ");
          const exten = budy.split(" ")[1];
          console.log(exten);
          if (validUrl.isUri(text)) {
            sendFileFromExtension(
              client,
              m.sender,
              text,
              "Your file",
              "Talha DOwnlaoder",
              exten
            );
          } else {
            const buttonMessage = {
              text: `not a valid url`,
              footer: "ChatGpt",

              headerType: 1,
            };

            client.sendMessage(m.sender, buttonMessage).then(() => {
              console.log(response.data.choices[0].message.content);
            });
          }
        } else if (command == "audio") {
          await UserModel.updateOne(
            { id: m.sender },
            { audio: !User[0].audio }
          );
          client.sendMessage(id, { text: "Audio is set to:" + !User[0].audio });
        } else if (command == "clear") {
          console.log(User[0].bot);
          if (User[0].bot === "gpt") {
            if (!fs.existsSync(`./user/${m.sender.split("@")[0]}.json`))
              return client.sendMessage(m.sender, { text: "`CLEARED`" });
            fs.unlinkSync(`./user/${m.sender.split("@")[0]}.json`);
          } else if (User[0].bot === "bard" || User[0].bot === "bard-only") {
            if (!fs.existsSync(`./data/${m.sender.split("@")[0]}.json`))
              return client.sendMessage(m.sender, { text: "`CLEARED`" });
            fs.unlinkSync(`./data/${m.sender.split("@")[0]}.json`);
          } else if (User[0].bot === "gpt-4") {
            if (!fs.existsSync(`./info/${m.sender.split("@")[0]}.json`))
              return client.sendMessage(m.sender, { text: "`CLEARED`" });
            fs.unlinkSync(`./info/${m.sender.split("@")[0]}.json`);
          }
          client.sendMessage(m.sender, { text: "`Cleared`" });
          return;
        } else if (command == "gpt") {
          const text = budy.split(" ").splice(1).join(" ");
          const res = await Gpt(text);
          if (res.success) client.sendMessage(m.sender, { text: res.message });
          else client.sendMessage(m.sender, { text: "Something gone wrong" });
          return;
        } else if (command == "data") {
          if (fs.existsSync(`./user/${m.sender.split("@")[0]}.json`)) {
            console.log("i am running exirs");
            let user = fs.readFileSync(
              `./user/${m.sender.split("@")[0]}.json`,
              { encoding: "utf-8" }
            );

            user = JSON.parse(user);
            console.log(user.length);

            for (let i = 0; i <= user.length - 1; i++) {
              console.log(user[i].role);
              await client
                .sendMessage(m.sender, {
                  text: `\n${user[i].role} \n${user[i].content}\n`,
                })
                .then(() => {})
                .catch((e) => console.log(e));
            }
          } else if (fs.existsSync(`./info/${m.sender.split("@")[0]}.json`)) {
            console.log("i am running exirs");
            let user = fs.readFileSync(
              `./user/${m.sender.split("@")[0]}.json`,
              { encoding: "utf-8" }
            );

            user = JSON.parse(user);
            console.log(user.length);

            for (let i = 0; i <= user.length - 1; i++) {
              console.log(user[i].role);
              await client
                .sendMessage(m.sender, {
                  text: `\n${user[i].role} \n${user[i].content}\n`,
                })
                .then(() => {})
                .catch((e) => console.log(e));
            }
          } else if (fs.existsSync(`./data/${m.sender.split("@")[0]}.json`)) {
            console.log("i am running exirs");
            let user = fs.readFileSync(
              `./data/${m.sender.split("@")[0]}.json`,
              { encoding: "utf-8" }
            );

            user = JSON.parse(user);
            console.log(user.length);

            for (let i = 0; i <= user.length - 1; i++) {
              console.log(user[i].role);
              await client
                .sendMessage(m.sender, {
                  text: `\n${user[i].role} \n${user[i].parts[0].text}\n`,
                })
                .then(() => {})
                .catch((e) => console.log(e));
            }
          } else {
            await client.sendMessage(m.sender, { text: "No data" });
          }

          return;
        }
        //  else if (budy.length<=2) {
        //   return client.sendMessage(m.sender, {text:'Response too short'})
        // }
        else if (command == "owner") {
          m.reply("Talha");

          return;
        } else if (budy == "users" || budy == "Users") {
          m.reply(users);

          return;
        } else if (command == "img") {
          console.log("runnig img");
          let text = budytext.splice(ai + 1);
          text = text.join(" ");
          m.reply("wait for processing");
          imgfromMJ(text, client, m.sender);
          //     img2(text, client, m.sender)
          // imgv3(text, client, m.sender)
        } else if (budyp > -1) {
          let up = Number(budytext[budyp + 1]);
          let text = budytext.splice(budyp + 2);

          //   for(let i = 0; i< up ; i++ ){
          //     m.reply(text)
          //   }
          let i = 0;
          function func() {
            let tome = setTimeout(() => {
              console.log(text);
              m.reply(`${text.join(" ")}`);

              if (i < up && up < 1001) func();
              i++;
            }, 50);
          }
          func();
          // for(i = Number(below); i< Number(up); i++ ){
          //    console.log(text)
          // }
          return;
        } else if (command === "sendfile") {
          let text = budy.split(" ").splice(1).join(" ");

          await sendFile(client, m, text, "./assets");
        } else if (command == "bot") {
          client.sendMessage(id, {
            text: "*|BOT_SELECTOR|*\n\nPlease reply to one of these *number*.  \n\n 2:bard \n\n 4:bard-only \n\n 5:gpt-4",
          });
        } else {
          if (!budy) return;
          //   if(data.filter(el=>el.id === m.sender.split('@')[0])[0].bot === 'gpt'){
          //    data.filter(el=> el.id === id.split('@')[0])[0].tokens =data.filter(el=> el.id === id.split('@')[0])[0].tokens -1 ;
          //    fs.writeFileSync('./data.json',JSON.stringify(data))
          //   if(data.filter(el=> el.id === id.split('@')[0])[0].tokens <= 0){
          //      client.sendMessage(id,{text:'Your free tokens are expired for functional chatgpt  today. You can use it later. Please select other Model'})
          //      client.sendMessage(id,{text:'*|BOT_SELECTOR|*\n\nPlease reply to one of these *number*. \n\n 1:gpt \n\n 2:bard \n\n 3:only-gpt'})

          //     return
          //   }
          //    chatGpt(client,m,budy)

          //  }
          //    else if(data.filter(el=>el.id === m.sender.split('@')[0])[0].bot === 'bard') bardTools(client,m, budy)
          //    else if(data.filter(el=>el.id === m.sender.split('@')[0])[0].bot === 'bard-only')  bard(client,m,budy)
          //    else if(data.filter(el=>el.id === m.sender.split('@')[0])[0].bot === 'gpt-4')  Gpt4Test(client,m,budy)

          //    else  client.sendMessage(id,{text:'*|BOT_SELECTOR|*\n\nPlease reply to one of these *number*.  \n\n 2:bard \n\n 4:bard-only'})
          if (User[0].bot == "gpt-4") Gpt4Test(client, m, budy);
          else if (User[0].bot == "bard-only") bard(client, m, budy);
          else if (User[0].bot == "bard") bardTools(client, m, budy);
          else Gpt4Test(client, m, budy);
        }
      } catch (err) {
        console.log(err);
        client.sendMessage(m.sender, { text: err.message });
      }
    }
  } catch (err) {
    m.reply(util.format(err));
  }
};
