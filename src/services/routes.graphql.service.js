import e from "connect-flash";
import { productContainer, userContainer } from "../server.js";

const root = {
	getProducts: async () => {
		return await productContainer.getProducts();
	},
	getUserById: async ({ id }) => {
		return await userContainer.getUser(id);
	},
	addProduct: async ({ product }) => {
		return await productContainer.addProduct(product);
	},
	addUser: async ({ user }) => {
		return await userContainer.saveUser(user);
	},
};

export { root };
