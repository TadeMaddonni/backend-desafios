import express from "express";
import cluster from "cluster";
import os from "os";

//Obtenemos numero de nucleos de nuestro ordenador.
const nucleoNumber = os.cpus().length;

const app = express();

const PORT = process.env.PORT || 8080;

//Configuracion del cluster
/* if (cluster.isPrimary) {
	//Crear subprocesos(Workers) por cada uno de los nucleos del procesador
	for (let i = 0; i < nucleoNumber; i++) {
		cluster.fork();
	}
	cluster.on("exit", (worker) => {
		console.log(`This worker ${worker.process.pid} dejo de funcionar`);
		cluster.fork();
	});
} else {
} */

app.listen(PORT, () =>
	console.log(`Server listening on port ${PORT} on ${process.pid}`)
);
app.get("/", (req, res) => {
	for (let i = 0; i < 1e8; i++) {}
	res.send(`server running  on ${process.pid}`);
	// cluster.worker.kill(); Simulación de procesos dejando de funcionar
});
