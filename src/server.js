import express from "express";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import session from "express-session";
import path from "path";
import passport from "passport";
import mongoose from "mongoose";
import { Strategy as LocalStrategy, Strategy } from "passport-local";
import { Server } from "socket.io";
import { Contenedor } from "./clase-contenedor/clase.js";
import { fileURLToPath } from "url";
import { chatSchema } from "./clase-contenedor/normalizeSchema/index.js";
import { normalize } from "normalizr";
import { DbConfig } from "./config/envConfig.js";
import { productRouter } from "./routes/products.js";
import { clientRouter } from "./routes/client.js";
import { loginRouter } from "./routes/login.js";
import { productSocket } from "./routes/productSocket.js";
import { chatSocket } from "./routes/chatSocket.js";
import { signupRouter } from "./routes/signup.js";
import { userModel } from "./models/UserModels.js";
import flash from "connect-flash";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

mongoose.connect(
	DbConfig.mongoAtlas.url,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(error) => {
		if (error) console.log("Conexion fallida");
		console.log("base de datos conectada correctamente");
	}
);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

export const productContainer = new Contenedor();

//Configuracion template engine handlebars
app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
app.set("views", __dirname + "/views");
app.set("view engine", ".hbs");

// APP USES
app.use(cookieParser());

app.use(
	session({
		store: MongoStore.create({
			mongoUrl: DbConfig.mongoAtlas.url,
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
app.use(flash());
app.use((req, res, next) => {
	app.locals.loginMessage = req.flash("loginMessage");
	app.locals.signupMessage = req.flash("signupMessage");
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
app.use("/api/productos", productRouter);
app.use(clientRouter);
app.use(loginRouter);
app.use(signupRouter);

const server = app.listen(8080, () => {
	console.log("Server listening on port 8080");
	productContainer.getProducts();
});

// Creación servidor websocker
const io = new Server(server);

io.on("connection", async (socket) => {
	console.log("Nuevo cliente conectado");

	productSocket(socket, io.sockets);
	chatSocket(socket, io.sockets);
});

/*
LINK FOTO PARA HACER MAS RAPIDO

https://i.postimg.cc/76b2Ld3b/coca-cola.png

*/
