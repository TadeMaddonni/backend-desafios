import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
	name: String,
	email: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
});

export const userModel = mongoose.model(userCollection, userSchema);
