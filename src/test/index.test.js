import { productContainer } from "../server.js";
import assert from "assert";

describe("Test de la clase de usuarios", async () => {
	it("Test de la función de obtener los productos", async () => {
		const products = await productContainer.getProducts();

		assert.equal(products.length, 5);
	});

	it("Test de la función de agregar un producto", async () => {
		const product = {
			name: "Producto test",
			price: 100,
			thumbnail: "https://picsum.photos/200/300",
		};
		const products = await productContainer.addProduct(product);

		assert.equal(products, "Producto agregado correctamente");
	});
});
