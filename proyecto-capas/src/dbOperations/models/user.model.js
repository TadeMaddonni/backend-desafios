import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		age: { type: Number },
	},
	{
		timestamps: true,
	}
);

export const UserModel = mongoose.model(userCollection, userSchema);
