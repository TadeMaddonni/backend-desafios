import { UserService } from "../services/user.service.js";

class UserController {
	static async getUsers(req, res) {
		try {
			const users = await UserService.getAll();
			res.status(200).json({ status: "success", data: users });
		} catch (error) {
			res.status(400).json({
				status: "error",
				message: `An error occured: ${error}`,
			});
		}
	}

	static async saveUser(req, res) {
		const { body } = req;
		console.log(body);
		try {
			const newUser = await UserService.save(body);
			res.status(200).json({ status: "success", data: newUser });
		} catch (error) {
			res.status(400).json({
				status: "error",
				message: `An error occured: ${error}`,
			});
		}
	}

	static async updateUser(req, res) {
		const { id } = req.params;
		const { body } = req;
		try {
			const response = await UserService.updateUser(id, body);
		} catch (error) {}
		const updatedUser = await UserService.updateUser(id, body);
		res.json(updatedUser);
	}

	static async deleteUser(req, res) {
		const { id } = req.params;
		const deletedUser = await UserService.deleteUser(id);
		res.json(deletedUser);
	}
}

export { UserController };
