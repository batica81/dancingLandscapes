
// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const opn = require('opn');

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})




// var app = require('express')();
var app = server;
var http = require('http').Server(app);
var io = require('socket.io')(http);

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

io.on('connection', function(socket){
  console.log('a user connected');
});

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });





///////////serial

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;


// const port = new SerialPort('COM3', {
const port = new SerialPort('/dev/ttyUSB0', {
  	baudRate: 9600
},
function (err) {
  if (err) {
    // return console.log('Error: ', err.message);
    return true;
  }
});

const parser = new Readline();

port.pipe(parser);

// parser.on('data', console.log);
parser.on('data', setCurrentProduct);


// logic

var currentProduct = "";

function setCurrentProduct(arg) {
	currentProduct = arg;

	    setTimeout(function () {
    	currentProduct = "no product";
    }, 500);
}

//////////////server




// Opens the url in the default browser
opn('http://127.0.0.1:3000');