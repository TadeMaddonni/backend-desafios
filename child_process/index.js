import { exec } from "child_process";
exec("node consola.js", (err, stdout, stderr) => {
	if (err) return console.log(err);
	if (stderr) return console.log(stderr);
	console.log("Resultado del proceso hijo", stdout);
});
//exec no devuelve nada hasta que la operación no termina.

console.log("Instruccion del proceso principal");
