const { Prodia } = require("prodia.js");

function getRandomItemFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
require('dotenv').config()


const AiImage = async (client,m,prompt) => {

  const prodia = new Prodia(getRandomItemFromArray( ['f0c25fbd-bc74-4216-a800-cccc24b0fc90','05d93d86-fe42-4278-abd8-0c136b87baab','42b1257092f34878aa502e773f388807','cfb28d52-5d02-4118-8e18-100263ee358e','637c1d8e-2b88-477b-a802-20941f6452ab','b1b3a380-04f5-4784-8690-665569c16d1b'])); // API KEY HERE
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