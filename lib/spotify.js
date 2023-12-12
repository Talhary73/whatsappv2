const SpottyDL = require('spottydl')
const ytd = require('./ytaudio')
class spotify {
    constructor(link){
        this.link = link
    }
    async detailsOfSingleTrack(){
     try {
        const res = await SpottyDL.getTrack(this.link)
        return res
         
      } catch (error) {
        console.log(error.message)
         return error.message
     }      
  
    }
   async detailsOfAlbum(){
     try {
        const res = await SpottyDL.getAlbum(this.link)
        return res
         
      } catch (error) {
        console.log(error.message)
         return error.message
     }      
  
    }
     async detailsOfPlaylist(){
     try {
        const res = await SpottyDL.getPlaylist(this.link)
        return res
         
      } catch (error) {
        console.log(error.message)
        return error.message
     }      
  
    }
  
}
const link = 'https://open.spotify.com/playlist/37i9dQZF1DWTyiBJ6yEqeu?si=LHAQ2ZBbQGCQpa_uj4c-LQ%0A'
const fun = async ()=>{
 try {
    
    console.log(res)
 } catch (error) {
    console.log(error)
 }
}

const spot = async(client,m,link,type)=>{
    try {
        
        if(type == 'single'){
          const res =await new spotify(link).detailsOfSingleTrack()
          await ytd(client,m,`https://music.youtube.com/watch?v=${res.id}`)

        }else if(type == 'playlist'){
          const res =await new spotify(link).detailsOfPlaylist()
          client.sendMessage(m.sender,{text:`*Please Wait Downloading...*\n\nName: ${res.name} \n\nTracks: ${res.trackCount}`})
          let i = 0; 
          const sendFile = async()=>{
             try {
                 await ytd(client,m,`https://music.youtube.com/watch?v=${ res.tracks[i].id}`)
                 if(i >= res.tracks.length ) return ;
                 i = i +1 ;
                 sendFile()
             } catch (error) {
                console.log(error.message);
                client.sendMessage(m.sender,{text:`Song not Found with name : ${res.tracks[i].title}`})
             }
           }
          sendFile()
         
        //   res.tracks.forEach(async el=>{
        //      await ytd(client,m,`https://music.youtube.com/watch?v=${el.id}`)
        //   })
        }else if(type == 'album'){
             client.sendMessage(m.sender,{text:"no one listen to albums."})
        }
        
    } catch (error) {
        console.log(error)
    }
}
module.exports = spot