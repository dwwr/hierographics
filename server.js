const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3001;
const server = require('http').createServer(app);
const io = require('socket.io');
const socket = io(server, { transports: ['websocket'], cors: {origin:'*'}});
const DIST_DIR = path.join(__dirname, '/dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(cors());
app.use(express.static(DIST_DIR));

app.get('*', (req, res) => {
  res.sendFile(HTML_FILE);
});

let users = {};
// let messages = [
//   { message: 'bbj', user: 'dw', character: 0 },
//   { message: 'bbj', user: 'dw', character: 1 },
//   { message: 'bbj', user: 'dw', character: 2 },
//   { message: 'bbj', user: 'dw', character: 3 },
//   { message: 'bbj', user: 'dw', character: 0 },
//   { message: 'bbj', user: 'dw', character: 1 },
//   { message: 'bbj', user: 'dw', character: 2 },
//   { message: 'bbj', user: 'dw', character: 3 },
//   { message: 'bbj', user: 'dw', character: 0 }
];

socket.on('connection', function (socket) {
  console.log('a user connected');
  users[socket.id] = {
    username: null,
    userId: socket.id,
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50,
    direction: null,
  };

  socket.on('newUser', (user) => {
    users[socket.id].username = user.username;
    users[socket.id].character = user.character || 0;
    console.log(users[socket.id])
    socket.emit('newSuccess', users[socket.id])
    socket.emit('currentUsers', users);
    socket.emit('messages', messages);
    socket.broadcast.emit('currentUsers', users);
  })

  socket.on('newMessage', message => {
    console.log(message);
    messages.unshift(message);
    console.log(messages);
    socket.broadcast.emit('messages', messages);
    socket.emit('messages', messages);
  });

  socket.on('playerMovement', (move) => {
    users[socket.id].x = move.x;
    users[socket.id].y = move.y;
    users[socket.id].direction = move.direction;
    socket.broadcast.emit('playerMoved', users[socket.id])
  })

  socket.on('playerStopment', () => {
    socket.broadcast.emit('playerStopped', users[socket.id]);
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
    delete users[socket.id];
    socket.emit('disconnected', socket.id);
    socket.broadcast.emit('disconnected', socket.id)
  });
});

server.listen(port, () => {
  console.log(`Sordid details following at http://localhost:${port}`)
});