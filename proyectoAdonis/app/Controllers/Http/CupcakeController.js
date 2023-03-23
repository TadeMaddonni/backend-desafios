"use strict";
const Cupcake = use("App/Models/Cupcake");
class CupcakeController {
	async getAll() {
		try {
			const data = await Cupcake.all();
			const dataJson = data.toJSON();
			return data;
		} catch (error) {
			throw new Error(error);
		}
	}
}

module.exports = CupcakeController;
