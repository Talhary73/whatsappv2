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
     }      
  
    }
   async detailsOfAlbum(){
     try {
        const res = await SpottyDL.getAlbum(this.link)
        return res
         
      } catch (error) {
        console.log(error.message)
     }      
  
    }
     async detailsOfAlbum(){
     try {
        const res = await SpottyDL.getAlbum(this.link)
        return res
         
      } catch (error) {
        console.log(error.message)
     }      
  
    }
    async DownloadSingle(links ,path){
        try {
            let album = await SpottyDL.downloadTrack(links , path, false)
            return album;
        } catch (error) {
            console.log(error.message)
        }
    }
     async DownloadAlbum(links,path){
        try {
            let album = await SpottyDL.downloadAlbum(links, path, false)
            return album;
        } catch (error) {
            console.log(error.message)
        }
    }
}

const spot = async(client,m,link)=>{
    try {

        const res =await new spotify('https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT').detailsOfSingleTrack()
        await ytd(client,m,`https://music.youtube.com/watch?v=${res.id}`)

    } catch (error) {
        console.log(error)
    }
}
module.exports = spot