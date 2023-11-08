const axios = require('axios');
const mime = require('mime-types');
const path = require('path');
const fs = require('fs');
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false, // Allow self-signed certificates
});
// Function to download a file and get its extension based on the Content-Type header
const getData = async (url, outputPath) => {
  try {
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'stream',
      httpsAgent: agent,
      
    });

    // Extract the MIME type from the Content-Type header
    const contentTypeHeader = response.headers['content-type'];

    if (contentTypeHeader) {
      const mimeType = contentTypeHeader.split(';')[0]; // Remove any optional parameters

      // Get the file extension based on the MIME type
      const fileExtension = mime.extension(mimeType);
     const urlParts = url.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    const fileNames = lastPart.split('?')[0];
      // If a valid extension is found, use it for the file name
      const fileName = `${fileNames}${fileExtension ? `.${fileExtension}` : ''}`;
      const outputFilePath = path.join(outputPath, fileName);

      const writer = fs.createWriteStream(outputFilePath);

      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      const fileInfo = {
        fileName: fileName,
        filePath: outputFilePath,
        fileExtension: fileExtension,
        mimeType
      };

      return fileInfo;
    } else {
      throw new Error('Unable to determine MIME type from the Content-Type header.');
    }
  } catch (error) {
    throw new Error(`Error downloading file: ${error.message}`);
  }
};



const sendFile = async (client, m, url ,path)=>{
    
   try {
     const data = await getData(url, path)
     client.sendMessage(m.sender,{text:'file is downloaded. Wait for uploading'})
     await client.sendMessage(m.sender,{
         document:{url:data.filePath},
         mimetype: data.mimeType,
       fileName:data.fileName,
     } ,{quoted:m})
     fs.unlinkSync(data.filePath)
   } catch (error) {
     fs.unlinkSync(data.filePath)
     client.sendMessage(m.sender,{text:error})
   }
}
module.exports = sendFile