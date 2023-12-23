const axios = require('axios')
const fs = require('fs')
const bardTools =async (client,m,budy) =>{

 console.log(m.sender)
  const API_KEY = "AIzaSyAz4YCKV7YhqLaw0oZW-xQZrKGC91xacqc"; // Replace with your actual API key
let data = [];
 
    if (!fs.existsSync(`./data/${m.sender.split('@')[0]}.json`)) {
      fs.writeFileSync(`./data/${m.sender.split('@')[0]}.json`, JSON.stringify([]));
    
    } else {
      data = fs.readFileSync(`./data/${m.sender.split('@')[0]}.json`);
     
      
    }

  const user = {
    role: "user",
    parts: [    
      {
        text: budy,
      },
    ],
  };
  // console.log([...history, user]);

  // return

  const tools = [
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
      description:
        "Send Documents based on Text from wikipedia. Also good for straight definitions.",
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

            description: "question of User that best describe the user request",
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
    {
      name: "audioYt",
      description: "This downloads audio and sends it.",
      parameters: {
        type: "object",
        properties: {
          text: {
            type: "string",

            description: " Direct link of Youtube video.",
          },
        },
        required: ["text"],
      },
    },
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
          fontFamily: { type: "string", description: "Font Family of Text" },
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
      name: "bard_gemini",
      description:
        "This will send the request to google gemini. chat bot. It will answer more difficult question.",
      parameters: {
        type: "object",
        properties: {
          text: {
            type: "string",

            description: "the request.",
          },
        },
        required: ["text"],
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
  ];
  const data1 = {
    contents: [...data, user], // Include the new user data in the contents array
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
      },
    );

    console.log(response.data.candidates[0].content.parts[0]);
    const newData = {
      role: response.data.candidates[0].content.role,
      parts: response.data.candidates[0].content.parts,
    };

    data.push(user);
    data.push(newData); // Push the new data to the history array
    fs.writeFileSync(`./data/${m.sender.split('@')[0]}.json`, JSON.stringify(data)); // Write the updated history to the file
  } catch (error) {
    console.error(error.response.data);
  }


// Call the function


}
bardTools('',{sender:'34234234@gmai.com'},'how are you')