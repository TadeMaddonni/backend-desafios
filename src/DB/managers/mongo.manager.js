import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class UserMongoManager {
	constructor(model) {
		this.model = model;
	}

	async getUser(username) {
		try {
			console.log(username);
			const user = await this.model.findOne({ email: username });
			const jsonUser = JSON.parse(JSON.stringify(user));
			return jsonUser ? jsonUser : false;
		} catch (error) {
			throw new Error(`Error al buscar el usuario ${error}`);
		}
	}
	async saveUser(user) {
		try {
			const userCreated = await this.model.create(user);
			console.log(userCreated);
			return userCreated ? userCreated : false;
		} catch (error) {
			throw new Error(`Error al guardar el usuario ${error}`);
		}
	}
}

export { UserMongoManager };
