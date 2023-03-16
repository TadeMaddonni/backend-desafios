import { UserMongoManager } from "../DB/managers/mongo.manager.js";
import { userModel } from "../DB/models/UserModels.js";
import { connectMongo } from "../config/database/dbConnection.js";
import assert from "assert";

describe("Test de la clase de usuarios", async () => {
	it("Test de la función de obtener un usuario", async () => {
		connectMongo();
		const instance = new UserMongoManager(userModel);
		const user = await instance.getUser("tade@gg.com");
		console.log(user);
		assert.equal(user, true);
	});
});
