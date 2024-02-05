const aptoide = require('aptoide-scraper')

const apk = async (client,m, apkName , getData)=>{

try {
    const res = await aptoide.search(apkName)
    if(res.length == 0) return client.sendMessage(m.sender,{text:"```Not found Anything```"})
    res.forEach(async (el,i)=>{
        if(i>=4) return;
        try {
            const dl= await aptoide.download(el.id)
            const captionHTML = `Name:` + "```"+ `${dl.name}`+"```"+ "\nSize:```" +`${dl.size}\n `+ "````" +`V:` + "```" + `${dl.lastup}`
             
            await getData(client, m.sender, dl.dllink, dl.name+".apk", captionHTML)
        } catch (error) {
            console.log(error)
        }
    })
} catch (error) {
    console.log(error)
     
    client.sendMessage(m.sender,{text:"```something gone wrong. Error Message ```"+error.message})
}
}
// APK('','','Whatsapp')
module.exports = apk