const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

// app.use(express.static(__dirname + '/public'));

function onConnection(socket){
  console.log('socket connected')
  socket.broadcast.emit('board', 'new p')

  socket.on('board', (data) => {
  	console.log('received', data)
  })

  socket.on('disconnect', (user) => {
    io.emit('disconnected',  user);
  });
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));