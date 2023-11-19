const fs = require('fs');
const fetch = require('node-fetch');
const OpenAI  = require('openai');
require('dotenv').config()
const openai = new OpenAI({
    apikey:process.env.API_KEY
});

// If you have access to Node fs we recommend using fs.createReadStream():
const try2 = async ()=>{
try {
// const res = await openai.files.create({ file: fs.createReadStream('tune.jsonl'), purpose: 'fine-tune' });
const fineTune = await openai.fineTuning.jobs.create({ training_file: 'file-6tQaBoK49pRg5ZhxwLFtPBoD', model: 'gpt-3.5-turbo' })
console.log(fineTune)
} catch (error) {
    console.log(error)
}
}
try2()