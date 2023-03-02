import express from "express";
import { productController } from "../../controllers/products.controller.js";

const router = express.Router();

router.get("/", productController.getProducts);

router.post("/", productController.addProduct);

export { router as productsRouter };
