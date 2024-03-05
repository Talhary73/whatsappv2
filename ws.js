// const server = require('http').createServer();
const websocket = async (server)=>{

const io = require('socket.io')(server,{cors:{origin:['https://whatsapp-bot-gpt4-0092f9af6e58.herokuapp.com']}});
const user  = require('./user1.js')
require('dotenv').config();
io.on('connection', socket => {
  console.log(socket.id)
  socket.on('add',(data , room)=>{
    // console.log('room',room)
    // socket.in(room).emit('add', 'Using socket')
    // io.emit('add', 'Using IO')
    // io.to(room).emit('add','User Connected With I')
    user(data.name,io,room)
  })
  io.emit('done',{name:'Connecting'})
});
}
module.exports = websocket
// server.listen(process.env.PORT|| 5001);