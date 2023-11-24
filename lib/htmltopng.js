const { createCanvas } = require('canvas')


const fun = async (client, m, text, width, height , fontSize ,backgoundColor)=>{
if(!backgoundColor) backgoundColor = 'white'

const canvas = createCanvas(Number(width), Number(height))
const ctx = canvas.getContext('2d')
ctx.fillStyle = backgoundColor;

ctx.font = `${fontSize}px Courier`;
const textNew = ctx.measureText(text)
const heightOfText = textNew.emHeightAscent
const widthOfText = textNew.width
const fillTextX = (Number(width) - widthOfText )/2 ; 
const fillTextY = (Number(height) - heightOfText)/2 
console.log(fillTextX+'x '+ fillTextY+ 'y')
ctx.fillText(text, fillTextX, fillTextY);


let dataUrl = canvas.toDataURL()
console.log(dataUrl)
let buffer = canvas.toBuffer('image/png');
client.sendMessage(m.sender,{image:buffer , mimetype:'image/png'})
}
module.exports = fun
// fun('','','600','600','talha is Myt name ','40')