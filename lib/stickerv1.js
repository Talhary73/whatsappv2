const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const fs = require('fs')
// Optional: If you'd like to use the legacy headless mode. "new" is the default.

// Your test function
const testFunction = async  (client,m,text,color,fontSize, colorofelement) => {
  console.log(text+color)
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
    
      // Set the content of the page with the provided HTML
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Text Sticker Example</title>
    <style>
      body{
        background-color:${color};
         font-size: 24px;
      }
      .sticker {
        border-radius: 30px;
        height: 80vh;
        width: 80vh;
        margin: 10vh auto;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 4em;
        box-shadow: 0 0 15px 15px rgba(0, 0, 0, 0.14);
        background-color:${colorofelement};
      }

    </style>
  </head>
  <body>
    <div class="sticker">
      ${text}
    </div>
  </body>
</html>
`;
      await page.setContent(htmlContent);
    
      // Screenshot the page and save it to the specified file
      const outputPath = 'output.png';
      await page.screenshot({ path: outputPath });
      
      let sticker = new Sticker(fs.readFileSync('output.png'), {
                pack: 'Talha', // The pack name
                author: 'Talha', // The author name
                type: StickerTypes.CROPPED,
                categories: ["🤩", "🎉"], // The sticker category
                id: "12345", // The sticker id
                quality: 100, // The quality of the output file
            });
            const buffer = await sticker.toBuffer();
    client.sendMessage(m.sender,{sticker:buffer ,mimetype:'image/webp'})
      // Close the browser
      await browser.close();
    
      console.log(`Image saved to ${outputPath}`);
} catch (error) {
    client.sendMessage(m.sender,{text:error.message})
}
}
/// Call your test function
module.exports = testFunction
