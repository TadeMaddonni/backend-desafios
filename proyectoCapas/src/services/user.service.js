import { options } from "../config/config.js";
import { getApiDao } from "../model/index.js";
import { UserValidation } from "../model/validations/user.validation.js";

const managers = await getApiDao(options.server.dbType);
const { UserManager } = await managers;
console.log(UserManager);
class UserService {
	static async getUsers() {
		return await UserManager.getAll();
	}

	static async saveUser(body) {
		try {
			UserValidation.validateUser(body, true, 10);
			return await UserManager.save(body);
		} catch (error) {
			throw new Error(`Ha ocurrido un error ${error}`);
		}
	}

	static async getUser(id) {
		return await UserManager.getById(id);
	}

	static async deleteById(id) {
		return await UserManager.deleteById(id);
	}
}

export { UserService };
