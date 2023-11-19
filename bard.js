const data = {
    "messages": [
        {
            "role": "user",
            "system": "I am a personal AI assistant for WhatsApp. I am created by M.Talha. My email is talhariaz5425869@gmail.com. My website is talhariaz.tech. You can contact me at +923320843832. Here are some of the things I can do:\n\n🧠 /ai <text> - generate text using AI\n🔍 /google <text> - search on Google\n🖼️ /img <text> - search for an image\n🔗 /pdfweb <link> - convert a webpage to PDF\n📷 /ss <link> - take a screenshot of a webpage\n📷 /insta <link> - save an Instagram photo or video\n💾 /save <download link> - download a file\n📄 /pdf <text> - generate a PDF from text\n🔊 /tts <text> - convert text to speech\n🎥 /video <text or YT link> - search for a video on YouTube\n🧹 /clear - clear the chat history\n🔎 /whois <whois> - lookup WHOIS information\n📱 /ufone - get free 1GB internet data\n📷 /ocr <image> - extract text from an image using OCR\n📝 /data - view previous chats with me\n\nI can also do voice chat with you."
        }

    ],
    "functions": [
            {
       
            name: "gimage",
            description: "This will send User picture according to giving text.",
            parameters: {
                type: "object",
                properties: {
                    address: {
                        "type": "string",
                       
                        "description": "This will return Text for function so it will send picture",
                    },
                    number: {
                        "type": "number",
                       
                        "description": "This will return number of how many pictures for normal set it to 3",
                    },
                    width: {
                        "type": "number",
                       
                        "description": "This will return minimum width for picture",
                    },height: {
                        "type": "number",
                       
                        "description": "This will return minimum height for picture",
                    }
                    
                },
                required: ["address","number","width",'height'],
            }
        
           }
           , {
      
            name: "getYtAudio",
            description: "This will take text as input and send the video based on Text. It search on youtube get the first video download it and send it.",
            parameters: {
                type: "object",
                properties: {
                    text: {
                        "type": "string",
                       
                        "description": "This will return Title of video that best describe the user request",
                    }
                    
                    
                },
                required: ["text"],
            }
        
           },
            {
      
            name: "wiki",
            description: "This will search text on Wikipedia and send it to user.",
            parameters: {
                type: "object",
                properties: {
                    text: {
                        "type": "string",
                       
                        "description": "This is the title for searching in wiki",
                    },pdf: {
                        "type": "boolean",
                       
                        "description": "wether to send  pdf or not ",
                    }
                    ,url: {
                        "type": "boolean",
                       
                        "description": "wether to send  url or not",
                    },textornot: {
                        "type": "boolean",
                       
                        "description": "wether to send summary or not ",
                    }
                    
                },
                required: ["text",'pdf','textornot','url'],
            }
        
           },{
      
            name: "instaDl",
            description: "This will download instagram video or image from instagram post link ",
            parameters: {
                type: "object",
                properties: {
                    text: {
                        "type": "string",
                       
                        "description": "This is direct link of instagram post",
                    },thumbnail: {
                        "type": "boolean",
                       
                        "description": "This is thumbnail for video",
                    }
                    
                    
                },
                required: ["text"],
            }
        
           },{
      
            name: "gptUrl",
            description: "Url and question as input send it to AI chatBot and respond back required result",
            parameters: {
                type: "object",
                properties: {
                    text: {
                        "type": "string",
                       
                        "description": "This will return question of User that best describe the user request",
                    }
                    ,url: {
                        "type": "string",
                       
                        "description": "This will return Direct Url that best describe the user request",
                    }
                    
                    
                },
                required: ["text",'url'],
            }
        
           },{
      
            name: "sendFile",
            description: "This will take Direct Link as input download it and send it to user. It must be smaller than 200 MB",
            parameters: {
                type: "object",
                properties: {
                    text: {
                        "type": "string",
                       
                        "description": "This is a Direct Url.",
                    }
                    
                    
                },
                required: ["text"],
            }
        
           },
     
           {
      
            name: "google",
            description: "This function will google anything user requested.",
            parameters: {
                type: "object",
                properties: {
                    text: {
                        "type": "string",
                       
                        "description": "This will return Title for google search that best describe the user request",
                    }
                    
                    
                },
                required: ["text"],
            }
        
           },
   
           {
       
            name: "ytaFromText",
            description: "This will take text or link as input and send the audio, song and docuemnt based on Text. It search on youtube get the first audio download it and send it.",
            parameters: {
                type: "object",
                properties: {
                    text: {
                        "type": "string",
                       
                        "description": "This will return Title of audio that best describe the user request",
                    }
                    
                    
                },
                required: ["text"],
            }
        
           }
           ,
           {
       
            name: "yts",
            description: "This will take text as input and send the links of youtube videos based on Text. It search on youtube and send it. It will not send the video. Donot run it when user ask send me the video.",
            parameters: {
                type: "object",
                properties: {
                    text: {
                        "type": "string",
                       
                        "description": "This will return Title of videos that best describe the user request",
                    }
                    
                    
                },
                required: ["text"],
            }
        
           }
           , {
       
            name: "ttsv2",
            description: "This will take text as input and convert into audio and send to the user",
            parameters: {
                type: "object",
                properties: {
                    text: {
                        "type": "string",
                       
                        "description": "This will return text of function that needs to be converted to speech.",
                    }
                    
                    
                },
                required: ["text"],
            }
        
           }, {
       
            name: "ssv2",
            description: "This function will send Screenshot to User.",
            parameters: {
                type: "object",
                properties: {
                    text: {
                        "type": "string",
                       
                        "description": "This is a url for webpage. It should start with https://",
                    }
                    
                    
                },
                required: ["text"],
            }
        
           },{
       
            name: "clear",
            description: "This will clear previous response with chatBot",
            parameters: {
                type: "object",
                properties: {
                    text: {
                        "type": "boolean",
                       
                        "description": "This will tell weather clear data or not.",
                    }
                    
                    
                },
                required: ["text"],
            }
        
           }
         ],
    "function_call":"auto"
}
require('fs').writeFileSync('./tune.json',JSON.stringify(data))