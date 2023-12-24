
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
module.exports= ss = async (client, id ,url) => {
  console.log('running ss')
  try {

   chromium.setHeadlessMode = true;

// Optional: If you'd like to disable webgl, true is the default.
chromium.setGraphicsMode = false;

// Optional: Load any fonts you need. Open Sans is included by default in AWS Lambda instances
await chromium.font(
  "https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf"
);


     const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });
    const page = await browser.newPage();

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
        caption:data.join(' ')  ,
    }
    
     await client.sendMessage(id, buttonMessage) 
    await browser.close();
  } catch (error) {
    console.error(error);
    await client.sendMessage(id, error) 
  }
}

// ss('','','https://www.google.com')