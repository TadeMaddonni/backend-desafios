import { productContainer } from "../config/database/dbManager.js";
class ProductServices {
	static async getProducts() {
		return await productContainer.productos;
	}

	static async addProduct(product) {
		return await productContainer.addProduct(product);
	}
}

export { ProductServices };
