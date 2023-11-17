const axios = require('axios');
const fs = require('fs');
const   mime = require('mime-types')

const getData = async (client, id, url, name, caption, extension, options) => {
  console.log('download is running');
  try {
    const urlParts = url.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    const fileName = lastPart.split('?')[0];
    options = options || {};
    const res = await axios({
      method: 'get',
      url,
      headers: {
        DNT: 1,
        'Upgrade-Insecure-Request': 1,
      },
      ...options,
      responseType: 'arraybuffer',
    });
    if(!fs.existsSync(`./assets/${id.split('@')[0]}`))
    fs.mkdirSync(`./assets/${id.split('@')[0]}`)
   const extension = mime.extension(res.headers['content-type'])
   console.log(extension)
    const filePath = `./assets/${id.split('@')[0]}/${fileName}.${extension}`;
    fs.writeFileSync(filePath, res.data);

    await client.sendMessage(id, {
      document: {
        url: filePath,
      },
      mimetype: res.headers['content-type'],
      fileName: `${name || fileName}`,
      caption:caption
    });
    fs.unlinkSync(filePath)
  } catch (err) {
    client.sendMessage(id, {text:`Something gone wront : ${err.message}`});
    console.error(err);
  }
};


// const axios = require('axios');
// const mime = require('mime-types');
// const path = require('path');
// const fs = require('fs');
// const https = require('https');

// const agent = new https.Agent({
//   rejectUnauthorized: false, // Allow self-signed certificates
// });
// // Function to download a file and get its extension based on the Content-Type header
// const getData = async (url, outputPath) => {
//   try {
//     const response = await axios({
//       method: 'get',
//       url: url,
//       responseType: 'stream',
//       httpsAgent: agent,
      
//     });

//     // Extract the MIME type from the Content-Type header
//     const contentTypeHeader = response.headers['content-type'];

//     if (contentTypeHeader) {
//       const mimeType = contentTypeHeader.split(';')[0]; // Remove any optional parameters

//       // Get the file extension based on the MIME type
//       const fileExtension = mime.extension(mimeType);
//      const urlParts = url.split('/');
//     const lastPart = urlParts[urlParts.length - 1];
//     const fileNames = lastPart.split('?')[0];
//       // If a valid extension is found, use it for the file name
//       const fileName = `${fileNames}${fileExtension ? `.${fileExtension}` : ''}`;
//       const outputFilePath = path.join(outputPath, fileName);

//       const writer = fs.createWriteStream(outputFilePath);

//       response.data.pipe(writer);

//       await new Promise((resolve, reject) => {
//         writer.on('finish', resolve);
//         writer.on('error', reject);
//       });

//       const fileInfo = {
//         fileName: fileName,
//         filePath: outputFilePath,
//         fileExtension: fileExtension,
//       };

//       return fileInfo;
//     } else {
//       throw new Error('Unable to determine MIME type from the Content-Type header.');
//     }
//   } catch (error) {
//     throw new Error(`Error downloading file: ${error.message}`);
//   }
// };

// // Example usage:
// const url = 'https://mover09.clicknupload.net:8080/d/h65mwnlqlryd7tr7odniriijkyscawxyfr6cunmis26bpq6ar33uysyruzhxy4zvx3ijjqar/Tears.Of.The.Sun.2003.720p.BluRay.HIN-ENG.x264.ESub-KatmovieHD.mkv'; // Replace with the URL of the file you want to download
// const outputPath = './files'; // Replace with the path where you want to save the downloaded file


// getData(url, outputPath)
//   .then((fileInfo) => {
//     console.log('Downloaded file information:');
//     console.log('File Name:', fileInfo.fileName);
//     console.log('File Path:', fileInfo.filePath);
//     console.log('File Extension:', fileInfo.fileExtension);
//   })
//   .catch((error) => {
//     console.error(error);
//   });





module.exports = getData;
