const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3001;

var server = require('http').createServer(app);
var io = require('socket.io');
const socket = io(server, { transports: ['websocket']});

const DIST_DIR = path.join(__dirname, '/dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(cors());
app.use(express.static(DIST_DIR));

app.get('*', (req, res) => {
  res.sendFile(HTML_FILE);
});

socket.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Sordid details following at http://localhost:${port}`)
});