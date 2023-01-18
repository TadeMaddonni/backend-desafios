import { exec, spawn } from "child_process";

/* exec("find /", (err, stdout, stderr) => {
	if (err) return console.log(err);
	if (stderr) return console.log(stderr);
	console.log("Resultado del proceso hijo: ", stdout);
}); */

const child = spawn("find", ["/"]);
child.stdout.on("data", (data) => {
	console.log(data.toString());
});

//Spawn permite ir capturando pequeñas respuestas

console.log("Instruccion del proceso principal");
