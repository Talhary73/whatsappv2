const { TiktokDL } = require("@tobyg74/tiktok-api-dl")

const tiktok = async (client, m,url)=>{
try {
  
  const res = await   TiktokDL(url, {version: "v2" })

   if(res.status=='error'){

     client.sendMessage(m.sender,{text:'Error Donloading. Please Wait...'})
     const res1 = await   TiktokDL(url, {version: "v3" })
     await client.sendMessage(m.sender,{video:{url:res1.result.video}})
     return
   }
     await client.sendMessage(m.sender,{video:{url:res.result.video}})
    
} catch (error) {
  console.log(error)
  client.sendMessage(m.sender,{text:error.message})
}
}
module.exports = tiktok