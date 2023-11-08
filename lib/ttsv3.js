const fs  = require("fs");
const path = require("path");
const OpenAI =  require("openai");
require('dotenv').config();
const openai = new OpenAI({apiKey:process.env.API_KEY});


const voices = ['alloy', 'echo', 'fable', 'onyx', 'nova','shimmer']
async function main( client, m , text) {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: voices[Math.floor(Math.random()*6)],
    input: text,
  });
  
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await client.sendMessage( m.sender, { audio: buffer , mimetype: 'audio/mp4' } ,{quoted: m})

}
module.exports = main