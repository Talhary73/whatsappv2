const puppeteer = require('puppeteer');


let browser ;
let page ;


const run = async()=>{
   browser = await puppeteer.launch({ headless: true , args: ['--no-sandbox']  });
 page = await browser.newPage();
}
run()
module.exports= ss = async (client, id ,url) => {

  console.log('runingss1')
  try {
  

    await page.goto(url, { waitUntil: 'networkidle2' });
    page.on('dialog', async dialog => {
      console.log(dialog.message());
      await dialog.accept();
    });
    const links = await page.$$eval('a', links => links.map(link => ({ href: link.href || 'NULL', textContent: link.textContent || 'NULL' })));
    
    
    const data = []
    links.forEach((el)=>{
        data.push(`Content:${el.textContent}\n ${el.href} \n\n`)
    })
   
    const screenshot = await page.screenshot({ fullPage: true });
    console.log(screenshot)
    const buttonMessage = {
        image: screenshot,
        caption:data.join(' '),
    }
    
     await client.sendMessage(id, buttonMessage)
   
  
  
  } catch (error) {
   
    
    await client.sendMessage(id,{text:' Error '})  
    console.error(error);
   
  }
}


