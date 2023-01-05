import express from "express";
import { Server } from "socket.io";
import { Contenedor } from "./clase-contenedor/clase.js";
import { fileURLToPath } from "url";
import handlebars from "express-handlebars";
import { chatSchema } from "./clase-contenedor/normalizeSchema/index.js";
import { normalize } from "normalizr";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { DbConfig } from "./db/dbConfig.js";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const productContainer = new Contenedor();

// APP USES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());

app.use(
	session({
		store: MongoStore.create({
			mongoUrl: DbConfig.mongoAtlas.url,
		}),
		secret: "sessionSecreta",
		//Indicarle a la sesión si vamos a guardar en memoria o persistencia externa
		resave: false,
		saveUninitialized: false,
	})
);

const pathfILE = path.join(__dirname, "/public/login.html");
console.log(pathfILE);

const server = app.listen(8080, () => {
	console.log("Server listening on port 8080");
	productContainer.getProducts();

	//rsproductContainer.getMessages();
});

// Creación servidor websocker
const io = new Server(server); // Conectamos el websocket con el servidor principal de Express.

app.get("/home", (req, res) => {
	if (req.session.username) {
		productContainer.logged = true;
	}
	console.log("home");
	res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/", (req, res) => {
	if (req.session.username) {
		productContainer.logged = req.session.username;
		res.sendFile(path.join(__dirname + "/public/index.html"));
	} else {
		res.redirect("/login");
	}
	res.render("home"); // Primer parametro: Nombre de la vista a mostrart
});

app.post("/login", (req, res) => {
	const { name } = req.body;
	if (name != "") {
		req.session.username = name;
		productContainer.logged = req.session.username;
		res.redirect("/");
	} else {
		res.send("Credenciales no validas");
	}
});

app.get("/login", (req, res) => {
	res.sendFile(pathfILE);
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

	//LOGIN
	socket.emit("login", productContainer.logged);
});

/*
LINK FOTO PARA HACER MAS RAPIDO

https://i.postimg.cc/76b2Ld3b/coca-cola.png

*/
