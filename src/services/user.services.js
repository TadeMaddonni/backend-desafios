import { productContainer, userContainer } from "../server.js";

export class UserService {
	static async saveUser(user) {
		try {
			const userCreated = await userContainer.saveUser(user);
			return userCreated ? userCreated : false;
		} catch (error) {
			throw new Error(`Error al guardar el usuario ${error}`);
		}
	}
	static async getUser(username) {
		try {
			const user = await userContainer.getUser(username);
			console.log(user);
			return user ? user : false;
		} catch (error) {
			throw new Error(`Error al guardar el usuario ${error}`);
		}
	}
}
