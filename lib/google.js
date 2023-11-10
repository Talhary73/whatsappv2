const  googleIt = require('google-it')

const google = async (client,id,text) =>{

googleIt({'query': text}).then(results => {
   
  let message = '';
  results.forEach(el=>{
    message = message + `*${el.title}*\n${el.link}\n${el.snippet} \n\n\n`
  })
  client.sendMessage(id,{text:message})
  console.log(message)
  
}).catch(e => {
  console.log(e)
  client.sendMessage(id,{text:e.message})
  
  // any possible errors that might have occurred (like no Internet connection)
})
}
module.exports = google