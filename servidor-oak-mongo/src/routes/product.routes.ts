import { Router } from "../../depts.ts";
import {
	findProducts,
	findProductsById,
	createProduct,
} from "../controllers/product.controller.ts";

export const userRouter = new Router()
	.get("/products", findProducts)
	.get("/products/:id", findProductsById)
	.post("/products", createProduct);
