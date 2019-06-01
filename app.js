const express = require('express');
const app = express();
const mysql = require('promise-mysql');
const http = require('http').Server(app);
const io = require('socket.io')(http, {path: 'muruchat/socket.io'});
const PORT = process.env.PORT || 8080;

app.get('/' , function(req, res){
    res.sendFile(__dirname+'/index.html');
});

io.on('connection',function(socket){
    socket.on('message',function(msg){
        console.log('message: ' + msg);
        insertMessage(msg);
        console.log('DB pushed');

        io.emit('message', msg);
    });
});

http.listen(PORT, function(){
    console.log('server listening. Port:' + PORT);
});

function insertMessage(msg) {
    let conn;

    let connection = mysql.createConnection({
        host: process.env.MURU_MYSQL_SERVICE_HOST,
        port: process.env.MURU_MYSQL_SERVICE_PORT,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    }).then(function (connect) {
        console.log('promise-mysql createConnection.');
        conn = connect;
        const sql = 'INSERT INTO muruchat.message SET ?';
        const inserts = {message: msg};
        const result = conn.query(sql, inserts);
        console.log(result);
        return result;
    }).then(function (res) {
        console.log(res);
        conn.end();
    }).catch(function(error) {
        if (conn && conn.end) conn.end();
        //logs out the error
        console.log('catch error.');
        console.log(error);
    });
    
}