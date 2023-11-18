const OpenAI =  require("openai");
require('dotenv').config();
const fs = require('fs');
function getRandomItemFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
async function show_console (name){
    console.log(name)
}
async function SendPicure (address){
    console.log(address)
}
function TellMeNameOfAnyCountry(country) {
    console.log(country,'This is running')
}
module.exports = gpt = async () => {


const apiKeys = [process.env.OPENAI_API_KEY,process.env.API_KEY_1,process.env.API_KEY_3]

const openai = new OpenAI({apiKey:getRandomItemFromArray(apiKeys)});

  try {


    
      
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0613",
        messages: [
            { role: "system", content: 'You are helpfull assistant' },
            { role: "user", content: 'Can you send Picture of moon' }
        ],
        functions:[
            {
       
            name: "show_console",
            description: "This will send the title of youtube video to Downloader. when user asked for any type of video",
            parameters: {
                type: "object",
                properties: {
                    name: {
                        "type": "string",
                       
                        "description": "This will return title for youtube video which user asked",
                    }
                    
                },
                required: ["name"],
            }
        
           },{
       
            name: "SendPicure",
            description: "This will send User picture according to giving text.",
            parameters: {
                type: "object",
                properties: {
                    address: {
                        "type": "string",
                       
                        "description": "This will return Text for function so it will send picture",
                    }
                    
                },
                required: ["address"],
            }
        
           }
      ],
      function_call:'auto'
      
    }
      
      
      );
      if(!response.choices[0].message.function_call) {
      const res = response.choices[0].message.function_call
      let arg = JSON.parse(res.arguments)
      
      if(res.name == 'show_console'){
        show_console(arg.name)
      }
      if(res.name == 'SendPicure'){
        show_console(arg.address)
      }
    } 
  }
   catch (error) {
   
   console.log(error)

    

   
  }

}

gpt()
