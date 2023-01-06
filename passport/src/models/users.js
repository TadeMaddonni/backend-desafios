import mongoose from "mongoose";

const usersCollection = "usuarios";

const userSchema = {
  name: String,
  email: {
    type: String,
    require: true,
  },
  passwprd: {
    type: String,
    require: true,
  },
};

export const userModel = mongoose.model(usersCollection, userSchema);
