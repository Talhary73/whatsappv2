const express = require('express');
const app = express()
const WebSocket= require('ws')
const server = require('http').createServer(app)
const wss = new WebSocket.Server({server:server})
wss.on('connection', function connection(ws) {
 ws.on('error', console.error);

  setInterval(() => {
     ws.send('something');
  }, 100);
  
});
app.use(express.static('./public'))

server.listen(3000,()=>{
    console.log('server is running')
})