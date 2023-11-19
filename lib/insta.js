const instagramDl = require("@sasmeee/igdl");
const axios = require('axios');

async function getImageBase64FromURL(url) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const imageBase64 = Buffer.from(response.data, 'binary').toString('base64');
    return imageBase64;
  } catch (error) {
    console.error('Error fetching image:', error.message);
    throw error;
  }
}
const insta = async (client , m ,url,thumbnail)=>{
try {
 const dataList = await instagramDl(url);

dataList.forEach(async (el)=>{
  if(thumbnail)
  client.sendMessage(m.sender,{image:{url:el.thumbnail_link}})
  client.sendMessage(m.sender,{video:{url:el.download_link},mimetype:'video/mp4'})
})

} catch (error) {
  console.log(error)
  client.sendMessage(m.sender,{text:error.message})
}
}
module.exports = insta