import express from "express";
import session from "express-session";

const app = express();

app.listen(8080, () => console.log("Server listening on port 8080"));

app.use(
	session({
		secret: "claveSecreta123",
		//Clave de encriptación de la información

		resave: true,
		saveUninitialized: true,
		//Donde almacenaremos las sessios (En este caso la memoria del servidor.)

		cookie: {
			maxAge: 20000, //20seg
		},
		//Configuaramos la cookie de la session
	})
);
//Configuramos las sessions del servidor.

app.get("/login", (req, res) => {
	const { nombre } = req.query;
	if (nombre) {
		req.session.username = nombre;
		res.send("Sesión iniciada");
	} else {
		res.send("No has ingresado un nombre");
	}
});

app.get("/perfil", (req, res) => {
	if (req.session.username) {
		res.send(`Bienvenido ${req.session.username}`);
	} else {
		res.redirect("/login");
	}
});

app.get("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.log("Error en el logout: " + err);
		}
	});
	res.send("Sesión finalizada, hasta la próxima");
});
