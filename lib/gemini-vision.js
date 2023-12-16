const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyAbnqySZ5OrvxRgrYkLh0p-YgFro9cjuKY");

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
 if(!type) type = 'image/png'
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  const imageParts = [fileToGenerativePart(buffer, type)];
  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  client.sendMessage(m.sender,{text:text})
}

module.exports = run