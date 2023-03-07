const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class UserMongoManager {
	constructor(model) {
		this.model = model;
	}

	async getUser(username) {
		try {
			const user = await this.model.findOne({ email: username });
			return user ? user : false;
		} catch (error) {
			throw new Error(`Error al buscar el usuario ${error}`);
		}
	}
	async saveUser(user) {
		try {
			const userCreated = await this.model.create(user);
			return userCreated ? userCreated : false;
		} catch (error) {
			throw new Error(`Error al guardar el usuario ${error}`);
		}
	}
}

export { UserMongoManager };
