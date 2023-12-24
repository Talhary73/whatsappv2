const axios = require('axios')


async function downloadImage(url) {
  try {
    const response = await axios.get(`https://capture-website-api-lovat.vercel.app/api/capture?url=${url}`, {
      responseType: 'arraybuffer',
    });

    // Extract content type from the response headers
    const contentType = response.headers['content-type'];

    // Create an object with buffer and content type
    const result = {
      buffer: Buffer.from(response.data, 'binary'),
      contentType: contentType,
    };

    return result;
  } catch (error) {
    console.error('Error downloading image:', error.message);
    throw error;
  }
}

module.exports= ss = async (client, id ,url) => {

 
  try {
   
  const res = await downloadImage(url)
   
  client.sendMessage(m.sender,{image:res.buffer,mimetype:res.contentType})
  } catch (error) {
   
    
    await client.sendMessage(id,{text:error.message})  
    console.error(error);
   
  }
}
// ss('','','https://www.google.com')

