const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const nameSpace = io.of('/');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv/config');

mongoose.connect(
  process.env.MONGO_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  () => {
    console.log('connected to database');
    console.log(`port is ${port}`);
  },
);

const MessageSchema = mongoose.Schema({
  userName: String,
  room: String,
  message: String,
  date: Number,
  sent: Boolean,
  expire_at: { type: Date, expireAfterSeconds: 86400 },
});

const Message = mongoose.model('Message', MessageSchema);

Message.find({}, (error, messages) => {
  if (error) {
    console.log(error);
  } else {
    console.log('messages fetched', messages);
  }
});

//Message.deleteMany({}, error => error && console.log(error));
//uncomment this and run to clear the collection ^^

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
http.listen(port, function() {
  console.log(`listening on port ${port}`);
});

app.use(express.static(path.join(__dirname, 'client/build')));

io.on('connect', function(socket) {
  console.log('user connected');
  let connectedSockets = nameSpace.connected;
  let userName = socket.handshake.query.userName;

  let room = socket.handshake.query.room;
  socket.join(room);

  let onlineUsers = {};
  Object.keys(connectedSockets).forEach(
    socketId =>
      (onlineUsers[socketId] = {
        userName: connectedSockets[socketId].handshake.query.userName,
        room: connectedSockets[socketId].handshake.query.room,
      }),
  );

  Message.find({ room }, (error, messages) => {
    if (error) {
      console.log(error);
    } else {
      console.log('messages fetched');
      socket.emit('get messages', messages);
      socket.emit('get online users', onlineUsers);
    }
  });

  socket.broadcast.emit('user connected', socket.id, userName, room);

  socket.on('disconnect', () => {
    socket.broadcast.emit('user disconnected', socket.id);
  });

  socket.on('user changed room', newRoom => {
    socket.leave(room);
    room = newRoom;
    socket.join(room);

    Message.find({ room }, (error, messages) => {
      error ? console.log(error) : socket.emit('get messages', messages);
    });

    connectedSockets[socket.id].handshake.query.room = newRoom;
    socket.broadcast.emit('user changed room', socket.id, room);
  });

  socket.on('user typing', function() {
    socket.to(room).emit('user typing', socket.id, userName);
  });

  socket.on('user stopped typing', function() {
    socket.to(room).emit('user stopped typing', socket.id);
    isTyping = false;
  });

  socket.on('chat message', function(message, privateUser, privateUserRoom) {
    message.sent = true;
    if (privateUser && privateUserRoom !== room) {
      io.to(privateUser).emit('private message notification', socket.id);
    }
    io.in(room).emit('chat message', message);
    new Message(message).save(error => {
      error && console.log(error);
    });
  });
});
