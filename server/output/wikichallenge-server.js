"use strict";
const http = require('http');
const https = require('https');
const server = http.createServer().listen(8080);
const io = require('socket.io')(server, { cors: { origin: '*' } });
io.sockets.on('connection', (socket) => {
    console.log('test');
    socket.on('test', () => {
        console.log('new user connected');
    });
});
console.log('test');
