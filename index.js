const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*"} })

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get('/home', (req, res) => {
    res.render('home')
})

server.listen(port , ()=>{
    console.log('server running on '+ port);
});

io.on('connection', (socket) => {
    console.log('socket.id', socket.id);
    // io.emit('message', 'connected'); // all connected user

    socket.on('message', (data) => {
        socket.broadcast.emit('message', data); // all connected user exclude - sender user
        // io.emit('message', data); // all connected user
    })

    socket.on('disconnect', function(){
        console.log('disconnect', socket.id);
        // io.emit('disconnect')
    });
    /* socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    }); */

    // ref method: https://stackoverflow.com/questions/32674391/io-emit-vs-socket-emit

})