import express from "express";
import handlebars from "express-handlebars";
import path from "path";
import cors from "cors";
import { options } from "./config/config.js";
import { connectMongoDB } from "./config/dbConnection.js";
import __dirname from "./utils.js";
import { apiRouter } from "./routes/index.js";
import os from "os";

// connectMongoDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configurar nuestro motor de plantillas
app.engine("hbs", handlebars.engine({ extname: ".hbs" }));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "hbs");
app.use(cors());
app.use(apiRouter);

const PORT = options.server.PORT;

if (options.server.MODE === "cluster" && cluster.isPrimary) {
	console.log("Modo cluster");
	const numCpus = os.cpus().length; // Numero de procesadores

	for (let i = 0; i < numCpus; i++) {
		cluster.fork();
	}
} else {
	console.log("modo fork");
	const server = app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT} on ${process.pid}`);
	});
}
