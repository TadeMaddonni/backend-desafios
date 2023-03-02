import { options } from "../config/config.js";
import { getApiDao } from "../model/index.js";

const managers = await getApiDao(options.server.dbType);
const { UserManager } = await managers;
console.log(UserManager);
class UserService {
	static async getUsers() {
		return await UserManager.getAll();
	}

	static async saveUser(body) {
		return await UserManager.save(body);
	}

	static async getUser(id) {
		return await UserManager.getById(id);
	}
}

export { UserService };
