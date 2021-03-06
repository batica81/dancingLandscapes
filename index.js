// Express static server with socket.io

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const opn = require('opn');


app.use(express.static('./'));

http.listen(3005, () => console.log('Example app listening on port 3005!'));

opn('http://127.0.0.1:3005', {app: ['chrome']});


/////////// Serial server

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;

const port = new SerialPort('COM5', {
// const port = new SerialPort('/dev/ttyUSB0', {
//         baudRate: 115200
        baudRate: 57600
    },
    function (err) {
        if (err) {
            return console.log('Error: ', err.message);
            // return true;
        }
    });

const parser = new Readline();

port.pipe(parser);

// parser.on('data', console.log);
parser.on('data', setCurrentProduct);

let currentProduct = 0;

function setCurrentProduct(arg) {
    currentProduct = arg;

    // if (currentProduct.substr(0, 5) === 'Paylo') {
        io.emit('msg', currentProduct);
    // }
    //     io.removeAllListeners();
}