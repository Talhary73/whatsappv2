
const path  = require('path')
const {getCanvasImage, HorizontalImage, registerFont, UltimateTextToImage, VerticalImage} = require('ultimate-text-to-image')
// const path = require("path");
// const {getCanvasImage, HorizontalImage, registerFont, UltimateTextToImage, VerticalImage} = require("ultimate-text-to-image");
const fs = require('fs')
// render the image
const axios = require('axios')
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const create_img = async(text , data)=>{
text = text.split('\n').join(' ')
try {
    const object =  {
    
    height:data.height,
    width: data.width ,
    paddingTop:12,
    paddingBottom:12,
    fontFamily: data.fontFamily,
    fontColor: data.fontColor,
    fontSize: Number(data.fontSize),
    lineHeight: 10,
    autoWrapLineHeightMultiplier: 0,
    marginTop: Number(data.marginTop),
    marginBottom:Number(data.marginBottom),
    align: data.align,
    valign: data.valign,
    borderColor: data.borderColor,
    borderSize: Number(data.borderSize),
    backgroundColor: data.backgoundColor,
    underlineColor: data.underLineColor,
    underlineSize: Number(data.underlineSize),
    }
const textToImage = new UltimateTextToImage(text, object);

const streamJpeg   = textToImage.render().toStream("image/webp")

const out = fs.createWriteStream(path.join(__dirname, "imageE4.webp"), streamJpeg);
streamJpeg.pipe(out);
await new Promise((resolve, reject) => out.on("finish", resolve).on("error", reject));

} catch (error) {
 console.log(error)
 throw new Error(error.message)    
}}

const sticker = async(client,m,text ,data)=>{
try {
    await create_img(text  ,data )

      let sticker = new Sticker(fs.readFileSync('./lib/imageE4.webp'), {
                pack: 'Talha', // The pack name
                author: 'Talha', // The author name
                
                categories: ["🤩", "🎉"], // The sticker category
                id: "12345", // The sticker id
                quality: 100, // The quality of the output file
            });
            const buffer = await sticker.toBuffer();
    client.sendMessage(m.sender,{sticker:buffer ,mimetype:'image/webp'})
} catch (error) {
    console.log(error)
}
}



module.exports = sticker;