const server = require('http').createServer();

const io = require('socket.io')(server,{cors:{origin:['http://127.0.0.1:5500']}});
const user  = require('./user1.js')
require('dotenv').config();
io.on('connection', socket => {
  console.log(socket.id)
  socket.on('add',(data)=>{
    console.log('add user',data)
    user(data.name,io)
  })
  io.emit('done',{name:'Connecting'})
});

server.listen(process.env.PORT|| 5001);