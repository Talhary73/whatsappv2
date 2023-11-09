const captureWebsite = import('capture-website')
const fs = require('fs')

module.exports= ss = async (client, id ,url) => {

  console.log('runingss1')
  try {
  
 const res = await captureWebsite
 const buffer = await res.default.buffer(url ,{emulateDevice: 'iPhone X' , fullPage:true,darkMode:true})
  
  fs.writeFileSync('./snc.png',buffer)
    const buttonMessage = {
        image: {url:'./snc.png'},
        
    }
    
     await client.sendMessage(id, buttonMessage)
   
  
  
  } catch (error) {
   
    
    await client.sendMessage(id,{text:error.message})  
    console.error(error);
   
  }
}


