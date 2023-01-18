import express from "express";
import { sumar } from "./sumar.js";
import { fork } from "child_process";

const app = express();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

let visitas = 0;
app.get("/", (req, res) => {
	res.send(`Has visitado esta ruta ${visitas++} veces`);
});

app.get("/calculo-bloq", (req, res) => {
	const resultado = sumar();
	res.send(`El resultado de la suma es ${resultado}`);
});

app.get("/calculo-nobloq", (req, res) => {
	//Creamos el proceso hijo
	const child = fork("child.js");
	child.on("message", (childMsg) => {
		console.log(childMsg);
		//Proceso hijo listo para funcionar
		if (childMsg === "listo") {
			child.send("iniciar");
		} else {
			res.send(`El resultado de la suma es ${childMsg}`);
		}
	});
});
