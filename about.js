 let i = 0;
 const axios = require('axios')
 const cheerio = require('cheerio')
const about = async (client)=>{


setInterval(async () => {
  try {
    const { data } = await axios.get('https://tribune.com.pk/weather-updates/islamabad');
    const $ = cheerio.load(data);
    
    const mainInfo = $('#nav-islamabad > div > div.height-60 > div.date > span').text();
    const currenTemp = $('#tabs-1').text();
    
    const minutes = Math.floor(i / 60);
    const hours = Math.floor(minutes / 60);
    const seconds = i % 60;

    const message = `\nDate: ${mainInfo} \nLocation: Islamabad \nTemp: ${currenTemp.split(' ').join('').split('\n').join('')}`;
    
     const showCase = `${hours}H:${minutes}m:${seconds}s` + message
    
    // Uncomment the line below if you want to update a profile status
    await client.updateProfileStatus(showCase);
    
    i = i + 60; // Increment i by 1 second
  } catch (error) {
    console.log(error);
  }
}, 60000);

}
module.exports = about
