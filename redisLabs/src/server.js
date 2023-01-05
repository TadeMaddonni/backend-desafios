import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import Redis from "ioredis";
import redisStrategy from "connect-redis";

const app = express();

app.listen(8080, () => {
	console.log("Server listening on port 8080");
});

// Crear cliente para conectarse a redisLabs
const redisClient = new Redis({
	host: "redis-14709.c239.us-east-1-2.ec2.cloud.redislabs.com",
	port: 14709,
	password: "ur8LvHWvwZYY9aM330qdauuUELokR6sL",
});

//Vinculacion de redis como store de la sesiones.
const RedisStore = redisStrategy(session);

app.use(cookieParser());

app.use(
	session({
		store: new RedisStore({ client: redisClient }),
		secret: "claveSecreta",
		//Indicarle a la sesión si vamos a guardar en memoria o persistencia externa
		resave: false,
		saveUninitialized: false,
		/* 		cookie: {
			maxAge: 10000, //Tiempo de vida de la cookie
		}, */
	})
);

app.get("/login", (req, res) => {
	const { nombre } = req.query;
	if (req.session.username) {
		//si ya esta logueado redirige al home
		return res.send("ya estás logueado");
	}
	//si no esta logueado
	if (nombre) {
		//si envía el nombre se loguea y crea sesión para este usuario
		req.session.username = nombre;
		// console.log(req.session)
		res.send("login exitoso!");
	} else {
		res.send("Por favor ingresar nombre de usuario");
	}
});

app.get("/home", (req, res) => {
	// console.log("home",req.session)
	if (req.session.username) {
		let user = req.session.username;
		res.send(`Bienvenido ${user}`);
	} else {
		res.redirect("/login");
	}
});

app.get("/logout", (req, res) => {
	req.session.destroy((error) => {
		if (!error) return res.send("logout exitoso");
		res.send(`Error:${error}`).status(500);
	});
});
