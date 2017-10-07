const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

function onConnection(socket){
  console.log('socket connected')
  socket.on('board_msg', (data) => {
  	// console.log('received', data)
  	socket.broadcast.emit('board_msg', data)

  	let {uid, role, name} = JSON.parse(data)
  	socket.emit('board_msg', JSON.stringify({code: 200, type: 'response', uid, role, name}))
  })

  socket.on('disconnect', (user) => {
    io.emit('disconnected',  user);
  });
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));