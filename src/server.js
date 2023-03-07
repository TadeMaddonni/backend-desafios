import express from "express";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import session from "express-session";
import path from "path";
import passport from "passport";
import cluster from "cluster";
import os from "os";

import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { DbConfig } from "./config/envConfig.js";
import { productSocket } from "./routes/productSocket.js";
import { chatSocket } from "./routes/chatSocket.js";
import { userModel } from "./DB/models/UserModels.js";
import { logger } from "./logger/logger.js";
import { router } from "./routes/index.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//Configuracion template engine handlebars
app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
app.set("views", __dirname + "/views");
app.set("view engine", ".hbs");

// APP USES
app.use(cookieParser());

app.use(
	session({
		store: MongoStore.create({
			mongoUrl: DbConfig.DATABASE_URL,
			ttl: 600,
		}),
		secret: "sessionSecreta",
		resave: false,
		saveUninitialized: false,
	})
);

//Vinculación de passport con el servidor
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	logger.info(`Request recibida en la ruta: ${req.url}`);
	next();
});
passport.serializeUser((user, done) => {
	return done(null, user.id);
});
passport.deserializeUser((id, done) => {
	// Con el ID buscamos al usuario en la base de datos, previamente serializado
	userModel.findById(id, (err, userFound) => {
		return done(err, userFound);
	});
});

// Server routes
app.use(router);

//Modo cluster o fork
if (DbConfig.mode === "cluster" && cluster.isPrimary) {
	console.log("Modo cluster");
	const numCpus = os.cpus().length; // Numero de procesadores

	for (let i = 0; i < numCpus; i++) {
		cluster.fork();
	}
} else {
	console.log("modo fork");
	const server = app.listen(DbConfig.port, () => {
		console.log(
			`Server listening on port ${DbConfig.port} on ${process.pid}`
		);
		productContainer.getProducts();
	});

	// Creación servidor websocker
	const io = new Server(server);

	io.on("connection", async (socket) => {
		console.log("Nuevo cliente conectado");

		productSocket(socket, io.sockets);
		chatSocket(socket, io.sockets);
	});
}
