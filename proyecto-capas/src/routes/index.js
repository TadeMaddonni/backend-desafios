import express from "express";
import { userRouter } from "./api/user.routes.js";
import { productsRouter } from "./api/products.routes.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Welcome");
});

router.use("/users", userRouter);
router.use("/products", productsRouter);

export { router };
