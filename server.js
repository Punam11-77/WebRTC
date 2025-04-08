const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

// Serve static files from "public" folder
app.use(express.static('public'));

// WebSocket handling
io.on('connection', (socket) => {
  console.log('A user connected');

  // When a user sends an offer/answer/candidate
  socket.on('signal', (data) => {
    console.log('Signal received:', data);
    socket.broadcast.emit('signal', data);  // Send to all other users
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start server
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
