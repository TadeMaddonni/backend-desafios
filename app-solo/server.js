const express = require("express");
const { Server } = require("socket.io");
const app = express();

const server = app.listen(8080, () =>
	console.log("Server listening on port 8080")
);

// Creación servidor websocker
const io = new Server(server); // Conectamos el websocket con el servidor principal de Express.

// Configuración server
app.use(express.static(__dirname + "/public"));

const messages = [
	{ author: "Juan", text: "Hola como estas" },
	{ author: "Pedro", text: "Bien y vos?" },
	{ author: "Ana", text: "Hola, yo barbaro. Vos?" },
];

io.on("connection", (socket) => {
	console.log("Un cliente nuevo se ha conectado");
	socket.emit("messages", messages);
	/* 	socket.on("mensaje", (data) => {
		chat.push({ user: socket.id, msg: data });
		console.log(chat);
		io.sockets.emit("messages", messages);
	}); */

	socket.on("newMessage", (data) => {
		messages.push(data);
		io.sockets.emit("messages", messages);
	});
});
