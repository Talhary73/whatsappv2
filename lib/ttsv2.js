const googleTTS = require('google-tts-api'); // CommonJS
const fs = require('fs')
const https = require('https')
const { Configuration, OpenAIApi } = require("openai")
require('dotenv').config()
const langdetect = require('langdetect');
module.exports  = ttsv2 = async (client, m, text) =>{
try {
  
  
      
     const lang = langdetect.detect(text)
     console.log(lang[0].lang)
      if(lang.length > 5) lang = 'ur'
      const results = googleTTS.getAllAudioBase64(text, {
        lang: lang[0].lang,
        slow: false,
        host: 'https://translate.google.com',
        timeout: 10000,
        splitPunct: ',.?',
      }).then(async(results)=> {
        let base64 = ''
        results.forEach((res)=>{
        
          base64 += res.base64
        }) 
        
        buffer = Buffer.from(base64, 'base64')
        
        await client.sendMessage( m.sender, { audio: buffer , mimetype: 'audio/mp4' } ,{quoted: m})
    }).catch(err=>{
      client.sendMessage(m.sender,{text:err.message})
    })
   
  
} catch (error) {
  console.log(error)
 client.sendMessage( m.sender, { text:'error detecting audio '} )

}

}