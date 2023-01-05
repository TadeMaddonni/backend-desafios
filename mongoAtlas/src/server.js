import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";

const app = express();

app.listen(8080, () => {
	console.log("Server listening on port 8080");
});

app.use(cookieParser());

app.use(
	session({
		store: MongoStore.create({
			mongoUrl:
				"mongodb+srv://tade:tade1506@coderbase.1m86azc.mongodb.net/sessionsDB?retryWrites=true&w=majority",
			ttl: 60,
		}),
		secret: "claveSecreta",
		//Indicarle a la sesión si vamos a guardar en memoria o persistencia externa
		resave: false,
		saveUninitialized: false,
		/* 		cookie: {
			maxAge: 10000, //Tiempo de vida de la cookie
		}, */
	})
);
console.log("mongo conectado");

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
