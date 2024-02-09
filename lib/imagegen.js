const { Prodia } = require("prodia.js");
const {Dalle, Sdxl} = require('./rsn.js')
const sdxl = require('./sdxl.js')
const dallE = require('./dallE.js')
const Pixart = require('./Pixart.js')
function getRandomItemFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
require('dotenv').config()


const AiImage = async (client,m,prompt) => {
 Dalle(client,m,prompt)
 Sdxl(client,m,prompt)
 sdxl(client,m,prompt)
 Pixart(client,m,prompt)
//  dallE(client,m,prompt)
  const prodia = new Prodia(getRandomItemFromArray( ['f0c25fbd-bc74-4216-a800-cccc24b0fc90']));  // API KEY HERE
  client.sendMessage(m.sender,{text:'Please Wait ⌛️ '})
  const generate = await prodia.generateImage({
    prompt: prompt,
    model: "Realistic_Vision_V5.0.safetensors [614d1063]",
    negative_prompt: "BadDream, (UnrealisticDream:1.3)",
    sampler: "DPM++ SDE Karras",
    cfg_scale: 9,
    steps: 30,
    aspect_ratio: "portrait",
  });

  while (generate.status !== "succeeded" && generate.status !== "failed") {
    new Promise((resolve) => setTimeout(resolve, 250));

    const job = await prodia.getJob(generate.job);

    if (job.status === "succeeded") {
      client.sendMessage(m.sender,{image:{url:job.imageUrl}})
      console.log(job);
      break;
    }
       
    
  }
}
module.exports = AiImage
