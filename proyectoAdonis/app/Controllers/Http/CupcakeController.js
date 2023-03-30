"use strict";
const UserInstance = use("App/Models/user");
class UserController {
	static async getAll() {
		try {
			const data = await UserInstance.getAll();
			return data;
		} catch (error) {
			throw new Error(error);
		}
	}

	static async getById(email) {
		try {
			const data = await UserInstance.getById(email);
			return data;
		} catch (error) {
			throw new Error(error);
		}
	}

	static async create(user) {
		try {
			const response = await UserInstance.create(user);
			return response;
		} catch (error) {
			throw new Error(error);
		}
	}
}

module.exports = UserController;
