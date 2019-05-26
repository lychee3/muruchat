var express = require('express');
var app = express();
const mysql = require('promise-mysql');
var http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 8080;

let conn = mysql.createConnection({
    host: process.env.MURU_MYSQL_SERVICE_HOST,
    port: process.env.MURU_MYSQL_SERVICE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});
console.log('connection created');

app.get('/' , function(req, res){
    res.sendFile(__dirname+'/index.html');
});

io.on('connection',function(socket){
    socket.on('message',function(msg){
        console.log('message: ' + msg);
        console.log('conn: ' + conn);
        const sql = 'INSERT INTO muruchat.message(message) values(?)';
        const data =[msg];
        conn.query(sql, data);
        console.log('DB pushed');

        io.emit('message', msg);
    });
});

http.listen(PORT, function(){
    console.log('server listening. Port:' + PORT);
});