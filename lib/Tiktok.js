// const { TiktokDL } = require("@tobyg74/tiktok-api-dl")
const tiktokDl = require("@sasmeee/tkdl");
const tiktok = async (client, m,url)=>{
try {
 

const res = await tiktokDl(url);


     await client.sendMessage(m.sender,{video:{url:res[0].hd},caption:res[0].title})
    
} catch (error) {
  console.log(error)
  client.sendMessage(m.sender,{text:error.message})
}
}

 const url = "https://vt.tiktok.com/ZSNrCmGyC";
 tiktok('','',url)
module.exports = tiktok