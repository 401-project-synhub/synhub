/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const socket = io('https://synhub.herokuapp.com');
const messageContainer = document.getElementById('message-container');
const roomContainer = document.getElementById('room-container');


const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');


messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit('comment', roomName, message);
  messageInput.value = '';
});


function getEl(id) {
  return document.getElementById(id);
}
const name = prompt('What is your name?');
appendMessage('You joined');
socket.emit('new-user', roomName, name);
const editor = getEl('editor');
editor.addEventListener('keyup', (evt) => {
  const message = editor.value;
  socket.emit('send-chat-message', roomName ,message);
});



socket.on('room-created', room => {
  const roomElement = document.createElement('div');
  roomElement.innerText = room;
  const roomLink = document.createElement('a');
  roomLink.href = `/${room}`;
  roomLink.innerText = 'join';
  roomContainer.append(roomElement);
  roomContainer.append(roomLink);
});


// socket.on('comment', (room, message) => {
//   socket.to(room).emit('send-comment', { message: message, name: rooms[room].users[socket.id] });
// });

socket.on('chat-message', data => {
  console.log(data.message,'from chat backend');
  editor.value=data.message;
});

// socket.on('send-comment', data => {
//   appendMessage(`${data.name}: ${data.message}`);
//   // editor.value=data.message;
// });

socket.on('user-connected', name => {
  appendMessage(`${name} connected`);
});

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`);
});

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}