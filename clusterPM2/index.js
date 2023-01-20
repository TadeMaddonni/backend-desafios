"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _cluster = require("cluster");

var _cluster2 = _interopRequireDefault(_cluster);

var _os = require("os");

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Obtenemos numero de nucleos de nuestro ordenador.
var nucleoNumber = _os2.default.cpus().length;

var app = (0, _express2.default)();

var PORT = parseInt(process.argv[2]) || 8080;

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

app.listen(PORT, function () {
	return console.log("Server listening on port " + PORT + " on " + process.pid);
});
app.get("/", function (req, res) {
	for (var i = 0; i < 1e8; i++) {}
	res.send("server running  on " + process.pid);
	// cluster.worker.kill(); Simulación de procesos dejando de funcionar
});
