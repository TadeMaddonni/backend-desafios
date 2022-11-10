const express = require("express");
const app = express();
const { Server } = require("socket.io");

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

app.use(express.static(__dirname + "/public"));

const io = new Server(server);

const messages = [
	{ author: "Juan", text: "¡Hola! ¿Que tal?" },
	{ author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
	{ author: "Ana", text: "¡Genial!" },
];

io.on("connection", (socket) => {
	console.log("Un Nuevo cliente se ha conectado");

	socket.emit("messages", messages);

	socket.on("newMessage", (data) => {
		console.log(data);
		messages.push(data);
		io.sockets.emit("messages", messages);
	});
});
