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

export { clientRouter };
