import express from "express";
import { productContainer } from "../server.js";

const clientRouter = express.Router();

clientRouter.get("/", (req, res) => {
	if (req.session.username) {
		res.render("home", { name: req.session.username });
	} else {
		res.redirect("/signup");
	}
});

clientRouter.get("/productos", async (req, res) => {
	if (req.session.username) {
		res.render("products", {
			products: productContainer.productos,
		});
	} else {
		res.redirect("/signup");
	}
});

clientRouter.get("/info", async (req, res) => {
	const rss = process.memoryUsage();
	console.log(rss);
	const processInfo = {
		entries: process.argv.slice(2),
		so: process.platform,
		node_version: process.version,
		rss: rss,
		path: process.cwd(),
		id: process.pid,
	};
	res.render("info", { processInfo: processInfo });
});

export { clientRouter };
