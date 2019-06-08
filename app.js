const express = require('express');
const app = express();
const mysql = require('promise-mysql');
const http = require('http').Server(app);
const io = require('socket.io')(http, {path: '/muruchat/socket.io'});
const PORT = process.env.PORT || 8080;

app.use('/muruchat', express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/muruchat');
});

app.get('/muruchat/' , (req, res) => {
    res.sendFile(__dirname+'/index.html');
});

io.on('connection', (socket) => {

    console.log('接続:' + socket.id);

    // 接続時にソケットIDをサーバからクライアントへ送る
    io.to(socket.id).emit('onConnect', {
        socket_id: socket.id
    });

    // ログインユーザに追加
    socket.on('onConnect', (data) => {
        login_users[data.socket_id] = data.login_name;
        console.log(login_users);
    });

    // チャットメッセージの同期
    socket.on('say', function (data) {
        io.emit('say', {
            socket_id: socket.id,
            login_name: data.login_name,
            chat_message: data.chat_message
        });
    });

});

/*
io.on('connection', (socket) => {
    const address = socket.handshake.headers["x-forwarded-for"].split(",")[0];
    socket.on('message',(msg) => {
        console.log('message: ' + msg);
//        insertMessage(msg + '(' + address + ')');
        console.log('DB pushed');

        io.emit('message', msg + '(' + address + ')');
    });
});
*/

http.listen(PORT, () => {
    console.log('server listening. Port:' + PORT);
});


// ログインユーザ管理用
var login_users = {};
/*
io.sockets.on('connection', (socket) => {

    console.log('接続:' + socket.id);

    // 接続時にソケットIDをサーバからクライアントへ送る
    io.to(socket.id).emit('onConnect', {
        socket_id: socket.id
    });

    // ログインユーザに追加
    socket.on('onConnect', (data) => {
        login_users[data.socket_id] = data.login_name;
        console.log(login_users);
    });

    // チャットメッセージの同期
    socket.on('say', function (data) {
        io.sockets.emit('say', {
            socket_id: socket.id,
            login_name: data.login_name,
            chat_message: data.chat_message
        });
    });

    // 他ユーザがログインしたときにメッセージとして通知
    socket.on('join', function (data) {
        socket.broadcast.emit('join', {
            socket_id: socket.id,
            login_name: data.login_name
        });
    });

    // 他ユーザの入力中のときにステータスとして通知
    socket.on('keydown', function (data) {
        socket.broadcast.emit('keydown', {
            socket_id: socket.id,
            login_name: data.login_name
        });
    });
    socket.on('keyup', function (data) {
        socket.broadcast.emit('keyup', {});
    });

    // 切断したときにメッセージとして通知
    socket.on('disconnect', function () {
        var key = socket.id.slice(2);

        socket.broadcast.emit('logout', {
            socket_id: socket.id,
            login_name: login_users[key]
        });
        // ログインユーザから削除
        console.log(key);
        delete login_users[key];
        console.log(login_users);
    });
});
*/


/*




io.on('connection', (socket) => {
    const address = socket.handshake.headers["x-forwarded-for"].split(",")[0];
    socket.on('message',(msg) => {
        console.log('message: ' + msg);
        insertMessage(msg + '(' + address + ')');
        console.log('DB pushed');

        io.emit('message', msg + '(' + address + ')');
    });
});

http.listen(PORT, () => {
    console.log('server listening. Port:' + PORT);
});
*/
/*
function insertMessage(msg) {
    let conn;

    let connection = mysql.createConnection({
        host: process.env.MURU_MYSQL_SERVICE_HOST,
        port: process.env.MURU_MYSQL_SERVICE_PORT,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    }).then((connect) => {
        console.log('promise-mysql createConnection.');
        conn = connect;
        const sql = 'INSERT INTO muruchat.message SET ?';
        const inserts = {message: msg};
        const result = conn.query(sql, inserts);
        console.log(result);
        return result;
    }).then((res) => {
        console.log(res);
        conn.end();
    }).catch((error) => {
        if (conn && conn.end) conn.end();
        //logs out the error
        console.log('catch error.');
        console.log(error);
    });
    
}*/