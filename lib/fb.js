const  snapsave  = require("snapsave-downloader2")

const video = async (client,m,url)=>{
    try {
        let URL = await snapsave(url)
        const res_720p = URL.data[0].url
       
        client.sendMessage(m.sender,{text:'⌛Please wait.'})
    
        await client.sendMessage(m.sender,{video:{url:res_720p},caption:'720P (HD)', mimetype:'video/mp4'})
        
       
    
    } catch (error) {
        client.sendMessag(m.sender,{text:error.message})
        console.log(error.message)
    }
}
module.exports = video