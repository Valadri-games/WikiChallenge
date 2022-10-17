/*

    Require modules

*/

const http = require('http');
const https = require('https');

/*

    Setup server

*/

const server = http.createServer().listen(8080);
const io = require('socket.io')(server, { cors: { origin: '*' } });

io.sockets.on('connection',(socket: any) => {
    console.log('test')

    socket.on('test', () => {
        console.log('new user connected');
    });
});

console.log('test')