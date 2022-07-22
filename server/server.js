const express = require('express');
const http = require('http');

const app = express();
const clientPath = `${__dirname}/../client`;



app.use(express.static(clientPath));
const server = http.createServer(app);

const port = 8080;

server.listen(8080, () =>{
    console.log("server running on "+port);
});

const io = require('socket.io')(server);

/* work work work work work work work work work work*/




user = {};
onlineUsers = [];
io.on('connection', socket => {
    // new user connected
    socket.on('new-user', name => {
        user[socket.id] = name;
        console.log(socket.id)
        onlineUsers.push(user[socket.id]);
        io.emit('user-connected', `${user[socket.id]} joined the chat`);
        //io.emit('showUsers', user);
        io.emit('onlinePeople', onlineUsers);
        console.log(onlineUsers);
    })


    // sending a messgae
    socket.on('sendMessage', message => {
        io.emit('sendMessage', message);
    })

    // user disconnecting
    socket.on('disconnecting', () => {
        deletingOfflineUsers(user[socket.id]);
        io.emit('userDisconnected', `${user[socket.id]} left the chat`);
        io.emit('onlinePeople', onlineUsers);
        //console.log(onlineUsers);
    })


});

function deletingOfflineUsers(user){
    let index = onlineUsers.indexOf(user);
    //console.log(index);
    onlineUsers.splice(index, 1);
    return onlineUsers;
}









