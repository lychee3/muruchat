var express = require('express');
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 8080;

app.get('/' , function(req, res){
    res.sendFile(__dirname+'/index.html');
});

io.on('connection',function(socket){
    console.log('connected');
});

http.listen(PORT, function(){
    console.log('server listening. Port:' + PORT);
});