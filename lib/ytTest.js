const fs = require('fs');
const { tlang, ringtone, cmd,fetchJson, sleep, botpic, getBuffer, pinterest, prefix, Config } = require('./my-func.js')
const ytdl = require('../ytdl-core/ytdl-core/lib/index.js');
const yta = require('./ytaudio.js')
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above
// const ytdld = async () => {
    
//     ytdl('http://www.youtube.com/watch?v=aqz-KE-bpKQ')
//     .pipe(fs.createWriteStream('video.mp4'));

// }
// ytdld()
var videotime = 60000 // 1000 min
var dlsize = 1000 // 1000mb

module.exports = ytd =async(Void, m, text) => {
    
    console.log('runnig ytd from me')
    const getRandom = (ext) => {
        return `${Math.floor(Math.random() * 10000)}${ext}`;
    };
    if (!text) {
        m.reply(`❌Please provide me a url`);
        return;
    }
    try {
        let urlYt = text;
        if (!urlYt.startsWith("http")) return m.reply(`❌ Give youtube link!`);
        let infoYt = await ytdl.getInfo(urlYt);
        
        if (infoYt.videoDetails.lengthSeconds >= videotime) {
            Void.sendMessage(m.sender,{text:'❌ Video Size is too Big'})
            return 
        } 
       
        let titleYt = infoYt.videoDetails.title;
        let descYt= infoYt.videoDetails.description
        let Owner = infoYt.videoDetails.ownerProfileUrl;
        let Views = infoYt.videoDetails.viewCount
        let UploadedDate = infoYt.videoDetails.uploadDate
        let channelName = infoYt.videoDetails.author.name;
        
        let randomName = getRandom(".mp4");

        const stream = ytdl(urlYt, {
                filter: (info) => info.itag == 22 || info.itag == 18,
            })
            .pipe(fs.createWriteStream(`./${randomName}`));
        await new Promise((resolve, reject) => {
            stream.on("error", reject);
            stream.on("finish", resolve);
        });
        let stats = fs.statSync(`./${randomName}`);
        let fileSizeInBytes = stats.size;
        let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
        if (fileSizeInMegabytes <= dlsize) {
            const captions = ` ⿻ Title : ${titleYt}\n ⿻ File Size : ${Math.floor(fileSizeInMegabytes)} MB \n`
            let buttonMessage = {
                video: fs.readFileSync(`./${randomName}`),
                mimetype: 'video/mp4',
                fileName: `${titleYt}.mp4`,
                caption: captions,
                headerType: 4,
                
            }
         Void.sendMessage(m.sender, buttonMessage)
         return fs.unlinkSync(`./${randomName}`);
        } else {
            m.reply(`❌ File size bigger than 100mb.`);
        }
        return fs.unlinkSync(`./${randomName}`);      
    } catch (e) {
        console.log(e)
    }
}