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
    });
    fs.unlinkSync(filePath)
  } catch (err) {
    client.sendMessage(id, {text:`Something gone wront : ${err.message}`});
    console.error(err);
  }
};

module.exports = getData;
