import express from "express";
import { DbConfig } from "../config/envConfig.js";
import { ProductServices } from "../services/products.services.js";
class productController {
	static async getProducts(req, res) {
		console.log(`Server ${DbConfig.port}Responding `);
		const productos = await ProductServices.getProducts();
		res.send(productos);
	}
	static async addProduct(req, res) {
		const newProduct = req.body;
		const result = await ProductServices.addProduct(newProduct);
		res.send(result);
	}
}

export { productController };
