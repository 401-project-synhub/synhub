'use strict';

// const express = require('express');
// const app = express();
const app = require('../app.js').app;
const express = require('../app.js').express;
const server = require('../app.js').server;
const io = require('socket.io')(server);
const path = require('path');

console.log(`hello from the chat server`);

/////****\\\\\\
// app.set('views', './views');
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const rooms = { };


// main page of rooms
app.get('/coding', (req, res) => {
  res.render('index', { rooms: rooms });
});

// 
app.post('/room', (req, res) => {
  console.log(rooms[req.params.room]);
  if (rooms[req.body.room] != null) {
    return res.redirect('/');
  }
  rooms[req.body.room] = { users: {} };
  res.redirect(req.body.room);
  // Send message that new room was created
  io.emit('room-created', req.body.room);
});

app.get('/:room', (req, res) => {
  if(req.params.room !== 'api'){                 //find another way to do it 
    console.log(rooms[req.params.room]);
    if (rooms[req.params.room] == null) {
      return res.redirect('/');
    }
    res.render('room', { roomName: req.params.room });
  }
});



io.on('connection', socket => {
  socket.on('new-user', (room, name) => {
    socket.join(room);
    rooms[room].users[socket.id] = name;
    socket.to(room).broadcast.emit('user-connected', name);
  });
  socket.on('send-chat-message', (room, message) => {
    socket.to(room).emit('chat-message', { message: message, name: rooms[room].users[socket.id] });
  });
 
  socket.on('comment', (room, message) => {
    socket.to(room).emit('send-comment', { message: message, name: rooms[room].users[socket.id] });
  });

  socket.on('disconnect', () => {
    getUserRooms(socket).forEach(room => {
      socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id]);
      delete rooms[room].users[socket.id];
    });
  });
});

function getUserRooms(socket) {
  return Object.entries(rooms).reduce((names, [name, room]) => {
    if (room.users[socket.id] != null) names.push(name);
    return names;
  }, []);
}

// server.listen(3000);