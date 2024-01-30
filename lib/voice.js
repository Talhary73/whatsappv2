require('dotenv').config()
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const FormData = require('form-data')
const { AssemblyAI } = require("assemblyai");


module.exports = voicer = async(client, id, path, callback)=>{
  const client1 = new AssemblyAI({
  apiKey: process.env.ASSEMBLY_AI,
});

client1.transcripts.transcribe({
  audio: path,
})
.then((res) =>{

console.log(res)
if(res.status ==='completed')
callback(res.text)
else
callback('Error')
})
}