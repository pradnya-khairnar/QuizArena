const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 4201;
const server = require('http').Server(app);
const { Server } = require("socket.io");
const io = new Server(server,{
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});

// Serve only the static files form the angularapp directory
app.use(express.static(__dirname + '/dist/QuizArena'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/QuizArena/index.html'));
});

// connecting, emiting & listing to client
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('count', (count)=>{
    io.emit('count', count);
  })
  socket.on('time', (time)=>{
    io.emit('time',time);
  })
   socket.on('ans', (ans)=>{
    io.emit('ans',ans);
  })
  socket.on('next',()=>{
    io.emit('next');
  })
});

// Start the app by listening on the default Heroku port
server.listen(port, function () {
    console.log("App running on port " + port);
})