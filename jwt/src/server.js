import express from "express";
import jwt from "jsonwebtoken";

const app = express();

const PORT = 8080;

app.listen(PORT, () => {
	console.log("Server listening on port 8080");
});

app.get("/login", (req, res) => {
	const userLogin = { email: "pepe@gmail.com", password: "1234" };
	//Validación de credenciales

	//Si existe generamos el token
	const userDB = {
		email: "pepe@gmail.com",
		name: "pepe",
		lastname: "morales",
		role: "admin",
	};
	//Generar el token

	jwt.sign(userDB, "claveSecretaToken", (err, token) => {
		if (err) return res.json({ message: "Error en la autenticación" });

		res.json({ access_token: token });
	});
});
const isValidToken = (req, res, next) => {
	//Acceder a los headers de la petición
	const headerToken = req.headers.authorization;

	if (headerToken) {
		const splittedToken = headerToken.split(" ");
		const userToken = splittedToken[1];

		jwt.verify(userToken, "claveSecretaToken", (err, decodeToken) => {
			if (err) return res.send("Token no valido");
			req.user = decodeToken;
			next();
		});
	} else {
		res.send("Token no valido o expirado");
	}
};
//ruta privada
app.get("/perfil", isValidToken, (req, res) => {
	res.send("Pagina de perfil");
});
