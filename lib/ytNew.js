const ytdl = require('../ytdl-core/ytdl-core/lib/index.js');

const getData = require('./downloadv2.js')

module.exports = ytd =async(Void, m, text,itag) => {
    

    
    if (!text) {
        m.reply(`❌Please provide me a url`);
        return;
    }
    try {
       
        if (!text.startsWith("http")) return m.reply(`❌ Give youtube link!`);

      
        
        
       let formats;
        const stream =await ytdl.getInfo(text);
        if(itag){
         formats= stream.player_response.streamingData.formats
         if(formats[1])
         formats[0] = formats[1]

        }
        formats = stream.player_response.streamingData.adaptiveFormats.filter((el)=>el.itag==itag)
        if(!formats[0]) {
         formats= stream.player_response.streamingData.formats
        if(formats[1])
         formats[0] = formats[1]
        }
        console.log(formats)
        getData(Void,m.sender,formats[0].url,'Youtube Video',formats[0].qualityLabel,'mp4')       

     
    } catch (e) {
        console.log(e)
        Void.sendMessage(m.sender,{text:e.message})
    }
}

