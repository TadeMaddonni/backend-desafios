import express from "express";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import session from "express-session";
import path from "path";
import passport from "passport";
import cluster from "cluster";
import os from "os";

import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { DbConfig } from "./config/envConfig.js";
import { productSocket } from "./routes/productSocket.js";
import { chatSocket } from "./routes/chatSocket.js";
import { userModel } from "./DB/models/UserModels.js";
import { logger } from "./logger/logger.js";
import { router } from "./routes/index.js";
import { getDbApi } from "./DB/index.js";
import { ProductServices } from "./services/products.services.js";
import { UserService } from "./services/user.services.js";
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
console.log("llega 1");
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
const { productContainer, userContainer } = await getDbApi(DbConfig.DB_TYPE);
console.log("llega 2");

//Modo cluster o fork
if (DbConfig.mode === "cluster" && cluster.isPrimary) {
	console.log("Modo cluster");
	const numCpus = os.cpus().length; // Numero de procesadores

	for (let i = 0; i < numCpus; i++) {
		cluster.fork();
	}
} else {
	console.log("modo fork");
	const server = app.listen(DbConfig.port, async () => {
		console.log(
			`Server listening on port ${DbConfig.port} on ${process.pid}`
		);
		await productContainer.getProducts();
	});

	// Creación servidor websocker
	const io = new Server(server);

	io.on("connection", async (socket) => {
		console.log("Nuevo cliente conectado");

		productSocket(socket, io.sockets);
		chatSocket(socket, io.sockets);
	});
}

// Construcción del esquema de GraphQL
const graphqlSchema = buildSchema(`
	type User{
		_id: String, 
		email: String, 
		password: String,
		version: Int
		
	}
	type Product{
		_id: String,
		name: String,
		price: Int, 
		thumbnail: String
	}

	input UserInput{
		email: String,
		password: String
	}

	input ProductInput{
		name: String,
		price: Int,
		thumbnail: String
	}

	type Query{
		getProducts: [Product], 
		getUserById(id: String): User,
	}
	
	type Mutation{
		addProduct(product: ProductInput): String
		addUser(user: UserInput): User
	}
`);

// Creamos la logica de los metodos "endpoints api rest"

const root = {
	getProducts: async () => {
		return await ProductServices.getProducts();
	},
	getUserById: async ({ id }) => {
		return await UserService.getUser(id);
	},
	addProduct: async ({ product }) => {
		return await ProductServices.addProduct(product);
	},
	addUser: async ({ user }) => {
		return await UserService.saveUser(user);
	},
};

//Enlazar el esquema con los metodos y los exponemos en un unico endpoint
app.use(
	"/graphql",
	graphqlHTTP({ schema: graphqlSchema, rootValue: root, graphiql: true })
);
export { productContainer, userContainer };
