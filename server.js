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
let messages = ['1','2','3','4','5','6','7','8','9'];

socket.on('connection', function (socket) {
  console.log('a user connected');
  users[socket.id] = {
    userId: socket.id
  };

  socket.on('newUser', (user) => {
    users[socket.id].username = user.username;
    socket.emit('newSuccess', users[socket.id])
    socket.emit('currentUsers', users);
    socket.emit('messages', messages);
    socket.broadcast.emit('currentUsers', users);
  })

  socket.on('newMessage', message => {
    console.log(message);
    messages.unshift(message);
    console.log(messages)
    socket.broadcast.emit('messages', messages);
    socket.emit('messages', messages);
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