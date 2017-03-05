const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
const PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);

var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'adam@adamth.com',
        text: 'Hello there',
        createdAt: 123
    });

    socket.on('createMessage', (message) => {
        socket.emit('newMessage',{
            from: message.from,
            text: message.text,
            createAt: new Date
        });
        console.log('Create email', message);
    })

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
});


server.listen(PORT,() => {
    console.log(`Server up on port ${PORT}`)
});
