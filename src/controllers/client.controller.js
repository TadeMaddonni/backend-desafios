import { DbConfig } from "../config/envConfig.js";
import os from "os";
import { logger } from "../logger/logger.js";
import { ProductServices } from "../services/products.services.js";

class clientController {
	static getHome(req, res) {
		if (req.session.username) {
			res.render("home", { name: req.session.username });
		} else {
			logger.warn("Usuario no registrado");
			res.redirect("/signup");
		}
	}

	static async getProducts(req, res) {
		if (req.session.username) {
			console.log(` server ${DbConfig.port} responding`);
			res.render("products", {
				products: await ProductServices.getProducts(),
				sever: DbConfig.port,
			});
		} else {
			logger.warn("Usuario no registrado");
			res.redirect("/signup");
		}
	}

	static async getInfo(req, res) {
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
	}

	static async suma(req, res) {
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
	}
}

export { clientController };
