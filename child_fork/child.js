import { sumar } from "./sumar.js";

process.send("listo");

process.on("message", (parentMsg) => {
	console.log(parentMsg);
	if (parentMsg === "iniciar") {
		const resultado = sumar();
		//Enviamos el resultado al proceso padre
		process.send(resultado);
	}
});
