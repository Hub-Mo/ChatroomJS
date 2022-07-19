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

io.on('connection', socket => {
    socket.on('sendMessage', message => {
        socket.broadcast.emit('sendMessage', message);
    })

});

