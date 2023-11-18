const { Client, MusicClient } = require("youtubei");

function convertSecondsToHoursMinutes(seconds) {
    // Calculate hours, minutes, and remaining seconds
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    // Format the result
    const hoursText = hours > 0 ? hours + 'h ' : '';
    const minutesText = minutes > 0 ? minutes + 'm' : '';

    return hoursText + minutesText;
}

module.exports =yts =  async(client, id, text) => {
try {
      const youtube = new Client();
            const videos = await youtube.search(text, {
              type: "video", // video | playlist | channel | all
            });
            
            let message = '|YT_DOWNLOADER|\n';
             message = message+ '\n*Reply Video Link number to Download video*\n'
            videos.items.forEach((el,i)=>{
                 message  = message + `${i+1}:${`https://www.youtube.com/watch?v=${el.id}\n*${el.title}*\nDuration:${convertSecondsToHoursMinutes(el.duration)}\nUploaded:${el.uploadDate}\n\n\n`}`
            })
           
      //  console.log(message)
            
            client.sendMessage(id,{image:{url:videos.items[0].thumbnails[1].url},caption:message})
             // Output: https://www.youtube.com/watch?v=2uUmHTgT65I
      
} catch (error) {
      client.sendMessage(id,{text:`Error:${error.message}`})
}
}
// yts('','','pakistan zindabad')
