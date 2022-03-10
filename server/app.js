const express = require('express');
const app = express();
const http=require('http').createServer(app);
const socket =require('socket.io')(http);

app.get('/',(req,res)=>{
   res.send('<h1>Hey Socket.io Is conected</h1>');
});
socket.on('connection',(io)=>{
   // console.log('connected...');
    io.on('my msg',(data)=>{
        console.log(data);
        io.broadcast.emit("my msg",data);
    })
})

http.listen(3000,()=>{
    console.log('app is listen at port ${3000}')
})