import { UserService } from "../services/user.service.js";

class UserController {
	static async getUsers(req, res) {
		try {
			const users = await UserService.getUsers();
			res.status(200).json({
				status: "SUCCESS",
				data: users,
			});
		} catch (error) {
			res.status(400).json({
				status: "ERROR",
				message: `Hubo un error ${error}`,
			});
		}
	}

	static async saveUser(req, res) {
		try {
			await UserService.saveUser(req.body);
			res.status(200).json({
				status: "SUCCESS",
				data: "Usuario guardado",
			});
		} catch (error) {
			res.status(400).json({
				status: "ERROR",
				message: `Hubo un error ${error}`,
			});
		}
	}

	static async getUser(req, res) {
		try {
			const response = await UserService.getUser(req.params.id);
			res.status(200).json({
				status: "SUCCESS",
				data: response,
			});
		} catch (error) {
			res.status(400).json({
				status: "ERROR",
				message: `Hubo un error ${error}`,
			});
		}
	}

	static async deleteById(req, res) {
		try {
			const response = await UserService.deleteById(req.params.id);
			res.status(200).json({
				status: "SUCCESS",
				data: response,
			});
		} catch (error) {
			res.status(400).json({
				status: "ERROR",
				message: `Hubo un error ${error}`,
			});
		}
	}
}

export { UserController };
