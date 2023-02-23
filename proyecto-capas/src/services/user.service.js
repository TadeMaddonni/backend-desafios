import { UserManager } from "../dbOperations/index.js";

class UserService {
	static async getAll() {
		return await UserManager.getAll();
	}

	static async getOlderUsers() {
		const users = await UserManager.getAll();
		return users.filter((user) => user.age > 18);
	}

	static async getById(id) {
		return await UserManager.getById(id);
	}

	static async save(user) {
		return await UserManager.save(user);
	}

	static async updateById(body, id) {
		return await UserManager.updateById(body, id);
	}

	static async deleteById(id) {
		return await UserManager.deleteById(id);
	}
}

export { UserService };
