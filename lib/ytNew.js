const fs = require('fs');
const ytdl = require('../ytdl-core/ytdl-core/lib/index.js');


 const getRandom = (ext) => {
        return `${Math.floor(Math.random() * 10000)}${ext}`;
    };
module.exports = ytd =async(client, m, text,itag) => {
    

    
    // if (!text) {
    //     m.reply(`❌Please provide me a url`);
    //     return;
    // }
    try {
       
        // if (!text.startsWith("http")) return m.reply(`❌ Give youtube link!`);
        let infoYt = await ytdl.getInfo(text);
        let titleYt = infoYt.videoDetails.title;

        let randomName = getRandom(".mp4");
         const stream = ytdl(text, {
                filter: (info) => info.itag == 22 || info.itag == 18,
            })
            .pipe(fs.createWriteStream(`./${randomName}`));
        
        await new Promise((resolve, reject) => {
            stream.on("error", reject);
            stream.on("finish", resolve);
        });
        const captions = ` ⿻ Title : ${titleYt}\n `
         await client.sendMessage(m.sender, {
         document: {
         url:`./${randomName}` ,
          },
          mimetype:'video/mp4',
         fileName: `${titleYt}.mp4`,
                caption: captions,
          
       });
        fs.unlinkSync(`./${randomName}`)
        // if(itag){
        //  formats= stream.player_response.streamingData.formats
        //  if(formats[1])
        //  formats[0] = formats[1]

        // }
        // formats = stream.player_response.streamingData.adaptiveFormats.filter((el)=>el.itag==itag)
        // if(!formats[0]) {
        //  formats= stream.player_response.streamingData.formats
        // if(formats[1])
        //  formats[0] = formats[1]
        // }
        // console.log(formats)
        // getData(Void,m.sender,formats[0].url,'Youtube Video',formats[0].qualityLabel,'mp4')       

     
    } catch (e) {
        console.log(e)
        // Void.sendMessage(m.sender,{text:e.message})
    }
}

// ytd('','','https://www.youtube.com/watch?v=t7lUSiddFd4')