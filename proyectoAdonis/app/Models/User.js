"use strict";

const { all } = require("@adonisjs/lucid/src/Lucid/Model");
const userModel = require("../../database/model/userModel");
/** @type  { options import("../../database/config.js")} */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
/** @type {mongoose import('mongoose')} */
/** @type {userModel import('./database/model/userModel')} */

const Model = use("Model");

class User extends Model {
	/* 	async connectDb() {
		try {
			console.log(option.databaseUrl);
			mongoose.set({ strictQuery: false });
			await mongoose.connect(options.databaseUrl);
			console.log("Database connected");
		} catch (error) {
			throw new Error(
				"An error occured while connecting to the database"
			);
		}
	} */
	async getAll() {
		const allUsers = await userModel.find();
		const json = JSON.parse(JSON.stringify(allUsers));
		return json;
	}

	async getById(id) {
		const user = await userModel.find({ _id: id });
		const json = JSON.parse(JSON.stringify(user));
		return json;
	}

	async create(user) {
		console.log(user);
		const response = "asd";
		//const response = await userModel.create(user);
		return response;
	}
}

const UserInstance = new User();
//UserInstance.connectDb();

module.exports = UserInstance;
