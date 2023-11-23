
const path  = require('path')
const {getCanvasImage, HorizontalImage, registerFont, UltimateTextToImage, VerticalImage} = require('ultimate-text-to-image')
// const path = require("path");
// const {getCanvasImage, HorizontalImage, registerFont, UltimateTextToImage, VerticalImage} = require("ultimate-text-to-image");
const fs = require('fs')
// render the image


const create_img = async(text , data)=>{

try {
    const object =  {
    
    height:data.height,
    width: data.width,
    
    fontFamily: data.fontFamily,
    fontColor: data.fontColor,
    fontSize: Number(data.fontSize),
    minFontSize: 10,
    lineHeight: 50,
    autoWrapLineHeightMultiplier: 1.2,
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
    client.sendMessage(m.sender,{sticker:{url:'./lib/imageE4.webp'} ,mimetype:'image/webp'})
} catch (error) {
    console.log(error)
}
}
module.exports = sticker;