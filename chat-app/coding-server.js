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

const rooms = {test: {users:{}, html:''} };


// main page of rooms
app.get('/coding', (req, res) => {
  res.render('index', { rooms: rooms });
});

// 
app.post('/room', (req, res) => {
  // console.log(rooms[req.params.room]);
  if (rooms[req.body.room] != null) { // rooms[test2] != null
    return res.redirect('/');
  }
  rooms[req.body.room] = { users: {} };
  res.redirect(req.body.room);
  // Send message that new room was created
  io.emit('room-created', req.body.room);
});

app.get('/:room', (req, res) => {
  if(req.params.room !== 'api' && req.params.room !== 'oauth'){          //find another way to do it 
    // console.log(rooms[req.params.room]);
    if (rooms[req.params.room] == null) {
      return res.redirect(`/`);
      // '';
      // return res.json()
    }
    res.render('room', { roomName: req.params.room });
  }
});



io.on('connection', socket => {
  console.log('hey');
  socket.emit('send-rooms', rooms);
  socket.on('new-user', (room, name, fSocketId) => {
    console.log('backend', name);
    console.log('newRoom', room);
    console.log('room of rooms 1', rooms[room]);

    if(!rooms[room]){
      rooms[room] = { users: {} };
      io.emit('send-rooms', rooms);
    }
    console.log('room of rooms 2', rooms[room]);
    socket.join(room);
    // rooms[room].users[`${name}Socket`] = name;
    rooms[room].users[socket.id] = name;
    rooms[room].users[fSocketId] = name;
    console.log('socketID1', socket.id);
    console.log('fSocketId', fSocketId);

    // console.log(rooms)
    // socket.to(room).broadcast.emit('user-connected', name);
    console.log('rooms', rooms);
    console.log('room HTML', rooms[room].html);
    socket.to(room).emit('send-comment', {message: 'Connected', name});

  });
  socket.on('send-chat-message', (room, message) => {
    console.log(message);
    console.log('name', rooms[room]);
    console.log('socketID2', socket.id);

    socket.to(room).emit('chat-message', { message: message});
    // io.emit('chat-message', { message: message, name: rooms[room].users[socket.id] });
    // io.to(room).emit('chat-message', { message: message, name: rooms[room].users[socket.id] });

  });

  socket.on('send-chat-message-html', (room, message) => {
    // console.log(message);
    console.log('name', rooms[room]);
    console.log('socketID2', socket.id);
    rooms[room].html = message;
    socket.to(room).emit('chat-message-html', { message: message});
    // io.emit('chat-message', { message: message, name: rooms[room].users[socket.id] });
    // io.to(room).emit('chat-message', { message: message, name: rooms[room].users[socket.id] });
  });

  socket.on('send-toggle-paint', (room, message) => {
    console.log('toggle', message );
    socket.to(room).emit('toggle-paint', { message: message});
    // io.emit('chat-message', { message: message, name: rooms[room].users[socket.id] });
    // io.to(room).emit('chat-message', { message: message, name: rooms[room].users[socket.id] });
  });

  socket.on('send-chat-message-css', (room, message) => {
    // console.log(message);
    console.log('name', rooms[room]);
    // console.log('socketID2', socket.id);

    socket.to(room).emit('chat-message-css', { message: message});
    // io.emit('chat-message', { message: message, name: rooms[room].users[socket.id] });
    // io.to(room).emit('chat-message', { message: message, name: rooms[room].users[socket.id] });
  });

  socket.on('send-chat-message-js', (room, message) => {
    // console.log(message);
    console.log('name', rooms[room]);
    // console.log('socketID2', socket.id);

    socket.to(room).emit('chat-message-js', { message: message});
    // io.emit('chat-message', { message: message, name: rooms[room].users[socket.id] });
    // io.to(room).emit('chat-message', { message: message, name: rooms[room].users[socket.id] });
  });

  socket.on('send-chat-message-result', (room, message) => {
    // console.log(message);
    console.log('name', rooms[room]);
    // console.log('socketID2', socket.id);

    socket.to(room).emit('chat-message-result', { message: message});
    // io.emit('chat-message', { message: message, name: rooms[room].users[socket.id] });
    // io.to(room).emit('chat-message', { message: message, name: rooms[room].users[socket.id] });
  });

  socket.emit('test', () => {
    console.log('client connected');
  });
 
  socket.on('comment', (room, message, fSocketId) => {
    console.log('1الفخ', rooms);
    // console.log('الفخ',rooms[room].users[socket.id]);
    console.log('2الفخ',rooms[room].users[fSocketId]);
    console.log('message', message);
    console.log('3الفخ',fSocketId);
    socket.to(room).emit('send-comment', { message: message, name: rooms[room].users[fSocketId] });
  });
   
  // socket.on('comment', () => {
  //   socket.emit('test2', () =>{
  //     console.log('test 2');
  //   });
  //   // socket.to(room).emit('send-comment', { message: message, name: rooms[room].users[socket.id] });
  // });

  socket.on('disconnect', () => {
    // socket.emit('front-disconnect');
    getUserRooms(socket).forEach(room => {
      console.log('disconnet room', room);
      console.log('disconnet socket id', socket.id);
      // socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id]);
      socket.to(room).emit('send-comment', {message: 'Disconnected', name: rooms[room].users[socket.id]});
      const value = rooms[room].users[socket.id];
      delete rooms[room].users[socket.id];
      delete rooms[room].users[getKeyByValue(rooms[room].users, value)];
      console.log('condition-0', rooms[room].users);
      if(Object.keys(rooms[room].users).length === 0){
        console.log('condintion');
        delete rooms[room];
        io.emit('send-rooms', rooms);
      }
    });
  });

  function getKeyByValue(object, value) {
    console.log('getFrontKey', Object.keys(object).find(key => object[key] === value));
    return Object.keys(object).find(key => object[key] === value);
  }
  // socket.on('front-disconnected', (fSocketId) => {
  //   getUserRooms(socket).forEach(room => {
  //     delete rooms[room].users[fSocketId];
  //   });
  // });

  
});



function getUserRooms(socket) {
  return Object.entries(rooms).reduce((names, [name, room]) => {
    console.log('name', name);
    console.log('room', room);
    if (room.users[socket.id] != null) names.push(name);
    return names;
  }, []);
}

// server.listen(4000);