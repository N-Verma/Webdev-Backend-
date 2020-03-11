var app = require('express')();
//var server = require('http').Server(app);
var io = require('socket.io')(5000);

// app.io=io;
const users = {}
// const io = require("socket.io")(5000);
io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})
module.exports=app;