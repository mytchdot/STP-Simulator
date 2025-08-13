const express = require("express");
const http = require("http");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


// Change `baudRate` & `portPath` to match your device input path and baud rate
const baudRate = 9600;
let portPath = "/dev/cu.usbserial-A5069RR4";

const port = new SerialPort({ path: portPath, baudRate: baudRate });
const parser = port.pipe(new ReadlineParser());

parser.on("data", (line) => {
    try {
        const data = JSON.parse(line);
        if (data !== undefined) {
            const tps = data / 10;
            io.emit("tps", tps);
        }
    } catch (err) {
        console.error("Invalid JSON:", line);
    }
});

// setInterval(() => {
//     // io.emit("tps", Math.random() * 90 + 10);
//     io.emit("tps", 100);
// }, 300);

app.use(express.static("public"));

server.listen(3000, () => {
    console.log("Server listening on http://localhost:3000");
});
