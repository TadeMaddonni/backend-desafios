import { ContenedorMongo } from "./managers/mongo.manager.js";
import { UserModel } from "./models/user.model.js";

export const UserManager = new ContenedorMongo(UserModel);
