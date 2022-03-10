const functions = require('firebase-functions');
const firebase = require('firebase-admin');

const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http').createServer(app);
const socket = require('socket.io')(http,{origin: ["http://localhost:4200", "https://wechat-bbb29.web.app"]});

app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200", "https://wechat-bbb29.web.app"] //Swap this with the client url 
  }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //<--
    // you can change this with a specific url like http://localhost:4200
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    
    res.header("Access-Control-Allow-Headers",
        'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,Authorization');
    next();
})


app.get('/', (req, res) => {
    res.send('<h1>Hey Socket.io Is conected...</h1>');

    
});
socket.on('connection', (io) => {
    // console.log('connected...');
    io.on('my msg', (data) => {
        console.log(data);
        io.broadcast.emit("my msg", data);
    })
})
http.listen(3000, () => {
    console.log('app is listen at port ${3000}')
})

//exports.app = functions.https.onRequest(app);
exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
