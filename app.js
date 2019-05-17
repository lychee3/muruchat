var express = require('express');
var app = express();
var http = require('http').Server(app);
const PORT = 8080;

app.get('/' , function(req, res){
   res.send('hello world');
});

http.listen(PORT, function(){
  console.log('server listening. Port:' + PORT);
});