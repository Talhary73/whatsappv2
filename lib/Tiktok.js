const { Tiktok } = require('@xct007/tiktok-scraper');


const tiktok = async (client, m,url)=>{
try { 
 

const res = await  Tiktok(url);

console.log(res['download'])
client.sendMessage(m.sender,{video:{url:res['download'].wm},caption:res.desc})
   client.sendMessage(m.sender,{video:{url:res['download'].nowm},caption:res.desc})
    
} catch (error) {
  console.log(error)
  client.sendMessage(m.sender,{text:'Error downloading'})
}
}
module.exports = tiktok