const { createWorker } = require("tesseract.js");
let worker = "";
const W = async () => {
  worker = await createWorker("eng");
};

const tesseract = async (img) => {
  if (!worker) await W();
  const ret = await worker.recognize(
    Buffer.from(img.split("base64,")[1], "base64")
  );

  console.log(ret.data.text);
  return ret.data.text;
  //   await worker.terminate();
};
module.exports = tesseract;
