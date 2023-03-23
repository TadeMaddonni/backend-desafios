import { productContainer, userContainer } from "../server.js";

// onst { productContainer, userContainer } = getMangaers();
class ProductServices {
	static async getProducts() {
		return await productContainer.productos;
	}

	static async addProduct(product) {
		return await productContainer.addProduct(product);
	}
}

export { ProductServices };
