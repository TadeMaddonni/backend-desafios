const mongoose = require("mongoose");

const usersCollection = "usuarios";

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
});

const userModel = mongoose.model(usersCollection, userSchema);

module.exports = userModel;
