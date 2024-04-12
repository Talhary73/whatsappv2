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
    description: "Download youtube video. It requires only Title of Video",
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
    name: "apk_dl",
    description: "Download Apk",
    parameters: {
      type: "object",
      properties: {
        text: {
          type: "string",

          description: "Name of APK",
        },
      },
      required: ["text"],
    },
  },
  // {
  //   name: "Gpt",
  //   description: "Answer complex question.",
  //   parameters: {
  //     type: "object",
  //     properties: {
  //       text: {
  //         type: "string",

  //         description: "question",
  //       },
  //     },
  //     required: ["text"],
  //   },
  // },

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
    description:
      "Download a youtube Video. Only works if get's input direct link provided from user",
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
    description:
      "This downloads audio version of Youtube Video. . Only works if get's input direct link provided from user",
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
    description: "Send audio version from of youtube video from Title of Video",
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
      "This will take text as input and convert into audio / voice and send to the user",
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
    description: "This function will send Screenshot of website to User.",
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
    name: "stickerv1",
    description: "It will send sticker from Text",
    parameters: {
      type: "object",
      properties: {
        html: {
          type: "string",

          description: "This is html with inline css",
        },
        bgcolorofbody: {
          type: "string",

          description: "background color of body",
        },
        bgcolorofelementcontainer: {
          type: "string",

          description: "background color of element container",
        },
        fontSize: {
          type: "string",

          description:
            "Font size of text in px unit it should be larger for smaller length of text and smaller for larger length of text. like for 2 words it should be 30px and similarly for larger lengths like 10 words it should be 23 and so on.",
        },
      },
      required: [
        "html",
        "bgcolorofbody",
        "bgcolorofelementcontainer",
        "fontSize",
      ],
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
  //   {
  //     name: "bardGemini",
  //     description:
  //       "This will send the request to google gemini. chat bot. It will answer more difficult question.",
  //     parameters: {
  //       type: "object",
  //       properties: {
  //         text: {
  //           type: "string",

  //           description: "the request.",
  //         },
  //       },
  //       required: ["text"],
  //     },
  //   }
  //  ,
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
  {
    name: "ai_image",
    description: "Generate Image from Text Using Ai",
    parameters: {
      type: "object",
      properties: {
        text: {
          type: "string",

          description: "Prompt for AI to create image from.",
        },
      },
      required: ["text"],
    },
  },
  {
    name: "ufone200",
    description: "This will give user free ufone 200Gb mints and sms.",
    parameters: {
      type: "object",
      properties: {
        text: {
          type: "string",

          description:
            "Number of user it should be like this Example: 03339513272",
        },
      },
      required: ["text"],
    },
  },
];
module.exports = tools;
