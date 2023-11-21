const { tlang, ringtone, cmd,fetchJson, sleep, botpic, getBuffer, pinterest, prefix, Config } = require('./my-func')
const googleTTS = require("google-tts-api");
const https = require('https')
const fs = require('fs-extra')
let ytsend = require('./ytNew.js')
const play = require('play-dl')
const { Client, MusicClient } = require("youtubei");
module.exports =ytd =  async(client, id, text) => {

 
  if (!text) {
      client.reply(`❌Please provide me a url`);
      return;
  }
  try {
     
   
      const youtube = new Client();
      const videos = await youtube.search(text, {
        type: "video", // video | playlist | channel | all
      });
      
  
       ytsend(client,m,`https://www.youtube.com/watch?v=${videos.items[0].id}`)
       
          
  } catch (e) {
      console.log(e)
  }
}
