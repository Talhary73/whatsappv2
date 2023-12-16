const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config()
const fs = require("fs");
// 
function getRandomItemFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
// Access your API key as an environment variable (see "Set up your API key" above)

//apis/
const apis = [process.env.BARD_API_1, process.env.BARD_API_2]
const genAI = new GoogleGenerativeAI(getRandomItemFromArray(apis));


// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(buffer).toString("base64"),
      mimeType,
    },
  };
}

async function run(client, m,prompt ,buffer,type) {
try {
     if(!type) type = 'image/png'
      // For text-and-image input (multimodal), use the gemini-pro-vision model
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
      const imageParts = [fileToGenerativePart(buffer, type)];
      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const text = response.text();
      console.log(text);
      client.sendMessage(m.sender,{text:text})
} catch (error) {
    console.log(error);
    client.sendMessage(m.sender,{text:error.message + '\n Image should not contain Human face.'})
}
}

module.exports = run