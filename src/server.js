import express from "express";
// import { handlebars } from "express-handlebars";
import { Server } from "socket.io";
import path from "path";
import { Contenedor } from "./clase-contenedor/clase.js";
import { measureMemory } from "vm";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);
const app = express();
const productContainer = new Contenedor();

// APP USES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const server = app.listen(8080, () => {
	console.log("Server listening on port 8080");
	productContainer.getProducts();
	productContainer.getMessages();
});

// Creación servidor websocker
const io = new Server(server); // Conectamos el websocket con el servidor principal de Express.

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
	//res.render("home"); // Primer parametro: Nombre de la vista a mostrart
});

io.on("connection", (socket) => {
	console.log("Nuevo cliente conectado");
	socket.emit("productos", productContainer.productos);
	socket.emit("messages", productContainer.sendMessages());

	socket.on("newProduct", (data) => {
		const message = productContainer.addProduct(data);
		console.log(message);
		productContainer.getProducts();
		setTimeout(() => {
			io.sockets.emit("productos", productContainer.productos);
		}, 1000);
	});

	socket.on("newMessage", (data) => {
		console.log(data);
		productContainer.addMessage(data);
		io.sockets.emit("messages", productContainer.sendMessages());
	});
});

/*
LINK FOTO PARA HACER MAS RAPIDO

https://i.postimg.cc/76b2Ld3b/coca-cola.png

*/
