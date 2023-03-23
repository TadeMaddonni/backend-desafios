import { UserMongoManager } from "../managers/mongo.manager.js";

class UserMongoDao extends UserMongoManager {
	constructor(model) {
		super(model);
	}
}

export { UserMongoDao };
