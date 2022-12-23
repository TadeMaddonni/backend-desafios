import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.listen(8080, () => console.log("Server listening on port 8080"));

app.use(cookieParser("claveSecreta"));
//Definimos que se use cookieParser

app.get("/set-cookie", (req, res) => {
	res.cookie("galleta1", "oreo").send("Galleta 1 creada");
});
//Creamos una cookie.

app.get("/set-cookie2", (req, res) => {
	res.cookie("galleta2", "Ritz", {
		maxAge: 50000,
	}).send("Galleta 2 creada");
});
//Creamos una cookie con un tiempo de vida.

app.get("/cookies", (req, res) => {
	res.send(req.cookies);
});
//Leer las cookies

app.get("/cookiesFirmadas", (req, res) => {
	res.send(req.signedCookies);
});
//Leer las cookies firmadas

app.get("/deleteCookie", (req, res) => {
	res.clearCookie("galleta1");
	res.send("Sesión finalizada");
});
//Borrar una cookie

app.get("/login", (req, res) => {
	res.cookie(
		"login-info",
		{ nombre: "Pepe", rol: "lector" },
		{ signed: true }
	).send("Sesión iniciada");
});
//Crear una cookie firmada (Si es modificada x el usuario queda invalidada)
