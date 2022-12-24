import express from "express";
// import { handlebars } from "express-handlebars";
import { Server } from "socket.io";
import path from "path";
import { Contenedor } from "./clase-contenedor/clase.js";
import { measureMemory } from "vm";
import { fileURLToPath } from "url";
import handlebars from "express-handlebars";
import { chatSchema } from "./clase-contenedor/normalizeSchema/index.js";
import { normalize } from "normalizr";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const productContainer = new Contenedor();

// APP USES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//Configuracion del motor de plantilas
app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
app.set("views", __dirname + "/views");
app.set("view engine", ".hbs");

const server = app.listen(8080, () => {
	console.log("Server listening on port 8080");
	productContainer.getProducts();
	//rsproductContainer.getMessages();
});

// Creación servidor websocker
const io = new Server(server); // Conectamos el websocket con el servidor principal de Express.

app.get("/", (req, res) => {
	res.render("home"); // Primer parametro: Nombre de la vista a mostrart
});

//funciones que normaliza datos
const normalizeData = (data) => {
	const normalizedData = normalize(
		{ id: "chatHistory", messages: data },
		chatSchema
	);
	return normalizedData;
};
const normalizeMessages = async () => {
	const messages = await productContainer.getMessages();
	const normalizedMessages = normalizeData(messages);
	return normalizedMessages;
};

io.on("connection", async (socket) => {
	console.log("Nuevo cliente conectado");
	//PRODUCTOS

	//envio de productos al conectarse
	socket.emit("productos", productContainer.productos);

	//Agregado de producto y envio de productos actualizados
	socket.on("newProduct", async (data) => {
		const message = await productContainer.addProduct(data);
		await productContainer.getProducts();
		setTimeout(() => {
			io.sockets.emit("productos", productContainer.productos);
		}, 1000);
	});

	//CHAT

	//Envio de mensajes normalizados
	socket.emit("messages", await normalizeMessages());

	//Agregado de mensaje y envio de mensajes actualizados y normalizads
	socket.on("newMessage", async (data) => {
		productContainer.addMessage(data);
		io.sockets.emit("messages", await normalizeMessages());
	});
});

/*
LINK FOTO PARA HACER MAS RAPIDO

https://i.postimg.cc/76b2Ld3b/coca-cola.png

*/
