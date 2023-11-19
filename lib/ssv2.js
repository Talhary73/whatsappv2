const axios = require('axios')
module.exports= ss = async (client, id ,url) => {

 
  try {
   
  const {data} = await axios.get(`https://shot.screenshotapi.net/screenshot?token=0JBRRK9-YE349VH-KQZYJ0C-V7FESKA&url=${url}`)
  client.sendMessage(m.sender,{image:{url:data.screenshot}})
  } catch (error) {
   
    
    await client.sendMessage(id,{text:error.message})  
    console.error(error);
   
  }
}


