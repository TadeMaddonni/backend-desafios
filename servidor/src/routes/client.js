import express from "express";
import compression from "compression";
import os from "os";
import { productContainer } from "../server.js";
import { DbConfig } from "../config/envConfig.js";
import { logger } from "../logger/logger.js";

const clientRouter = express.Router();

clientRouter.get("/", (req, res) => {
	if (req.session.username) {
		res.render("home", { name: req.session.username });
	} else {
		logger.warn("Usuario no registrado");
		res.redirect("/signup");
	}
});

clientRouter.get("/productos", async (req, res) => {
	if (req.session.username) {
		console.log(` server ${DbConfig.port} responding`);
		res.render("products", {
			products: productContainer.productos,
			sever: DbConfig.port,
		});
	} else {
		logger.warn("Usuario no registrado");
		res.redirect("/signup");
	}
});

clientRouter.get("/info", async (req, res) => {
	const numCpus = os.cpus().length; // Numero de procesadores

	const rss = process.memoryUsage();
	const processInfo = {
		entries: process.argv.slice(2),
		so: process.platform,
		node_version: process.version,
		rss: rss,
		path: process.cwd(),
		id: process.pid,
		cpu_number: numCpus,
	};

	res.render("info", { processInfo: processInfo });
});

clientRouter.get("/infoZip", compression(), async (req, res) => {
	const numCpus = os.cpus().length; // Numero de procesadores

	const rss = process.memoryUsage();
	const processInfo = {
		entries: process.argv.slice(2),
		so: process.platform,
		node_version: process.version,
		rss: rss,
		path: process.cwd(),
		id: process.pid,
		cpu_number: numCpus,
	};
	console.log(processInfo);
	res.render("info", { processInfo: processInfo });
});

clientRouter.get("/suma", (req, res) => {
	logger.warn("Recuerda ingresar numeros");
	const { num1, num2 } = req.query;
	console.log(num1, num2);
	if (!isNaN(parseInt(num1)) && !isNaN(parseInt(num2))) {
		const suma = num1 + num2;
		logger.info("well done");
		res.send("bien papa");
	} else {
		logger.error("Faltan numeritos crack");
		res.send("bien Error");
	}
});

export { clientRouter };
