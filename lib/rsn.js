const { RsnChat } = require("rsnchat");
const fs = require("fs");
const rsnchat = new RsnChat("rsnai_L1nPxz7pEe80i9VbkwbsQI4o");

// const negative_prompt = "blury, bad quality";

const Dalle = async (client, m ,prompt) => {
  const response1 = await rsnchat.dalle(prompt);
  const buffer1 = Buffer.from(response1.image, "base64");
//   fs.writeFileSync(`./image1.png`, buffer1);

 client.sendMessage(m.sender, {image:buffer1, caption:"With Dalle"})
const res = await GptForDallE(prompt);

  if (!res.success) return { success: false };
  const response = await rsnchat.dalle(res.message);
  console.log(response.success);
  const buffer = Buffer.from(response.image, "base64");
//   fs.writeFileSync(`./image.png`, buffer);
 client.sendMessage(m.sender,{image:buffer, caption:res.message}, )
return { buffer1, buffer, success: true };
};
// const Absolute = async () => {
//   const response = await rsnchat.absolutebeauty(prompt, negative_prompt);
//   console.log(response.success);
//   fs.writeFileSync("./image1.png", Buffer.from(response.image, "base64"));
// };

// const Sdxl = async () => {
//   const response = await rsnchat.sdxl(prompt, negative_prompt);
//   console.log(response.success);
//   fs.writeFileSync("./image2.png", Buffer.from(response.image, "base64"));
// };
const GptForDallE = async ( prompt1) => {
  try {
    const response = await rsnchat.gpt(
      `Enhance this prompt For Ai image gen You should only return Prompt nothing else. Prompt:${prompt1}`
    );
    console.log(response);
    return response;
  } catch (error) {
    return { success: false };
  }
};
const Gpt = async (prompt1) => {
  try {
    const response = await rsnchat.gpt(prompt1);
    console.log(response);
    return response;
  } catch (error) {
    return { success: false };
  }
};
// Dalle("girl and boy doing sex");
// Gpt("why humans are born ");
// Absolute();
// Sdxl();
module.exports = { Dalle ,Gpt}