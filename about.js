 let i = 0;
 const axios = require('axios')
 const cheerio = require('cheerio')
 const fs = require('fs')
const about = async (client)=>{


setInterval(async () => {
  try {
    const { data } = await axios.get('https://tribune.com.pk/weather-updates/islamabad');
    const $ = cheerio.load(data);
    const mainInfo = $('#nav-islamabad > div > div.height-60 > div.date > span').text();
    const currenTemp = $('#tabs-1').text();
    const minutes = Math.floor(i % 60);
    const hours = Math.floor(minutes % 60);
    const seconds = i % 60;
    const message = `\nDate: ${mainInfo} \nLocation: Islamabad \nTemp: ${currenTemp.split(' ').join('').split('\n').join('')}`;
    const showCase = `${hours}h:${minutes}m:${seconds}s` + message
     // Uncomment the line below if you want to update a profile status
    await client.updateProfileStatus(showCase);
  
    const jid = '923185853847@s.whatsapp.net'
    const res = await axios.get('https://random.imagecdn.app/1000/1000',{
       responseType: 'arraybuffer'
    })
     require('fs').writeFileSync('./image.png',res.data)
    await client.updateProfilePicture(jid, { url: './image.png' })
    i = i + 60; // Increment i by 1 second
  } catch (error) {
    const jid = ['923185853847@s.whatsapp.net','923101502365@s.whatsapp.net']
    jid.forEach(async (id)=>{
          try {
             await client.sendMessage(id,{text:error.message})
          } catch (error) {
            client.sendMessage(id,{text:error.message})
          }
    })
    
     
    console.log(error);
  }
}, 60000);

}
module.exports = about
