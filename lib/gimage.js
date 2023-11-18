const gis = require('g-i-s');
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
const img = async (client, m,text , number, width) =>{
 if(!width) 
 width = 640;
 gis(text, logResults);

async function logResults(error, results) {
  if (error) {
    console.log(error);
    client.sendMessage(m.sender,{text:'Something goes wrong.'})
  }
  else {
    try {
      const res = results.filter((el)=>el.width>width)
  
      
      const shuffledImages = shuffleArray(res);
      const numberOfImagesToSend = number ;
  
  // Send the first numberOfImagesToSend images
      shuffledImages.slice(0, numberOfImagesToSend).forEach(async (el) => {
      console.log(el.url);
       await client.sendMessage(m.sender, { image: { url: el.url } });
      });
    } catch (error) {
      client.sendMessage(m.sender,{text:'something went wrong'})
    }
    
  }
}
}
module.exports = img
// img('','','cat')