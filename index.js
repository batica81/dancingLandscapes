var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

    

http.listen(3000, function(){
  console.log('listening on *:3000');
});


io.on('connection', function(socket){
	io.removeAllListeners();

	setInterval(function () {
		var d = new Date();
		io.emit('chat message', d);
	}, 1000);

});