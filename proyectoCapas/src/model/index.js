/* import { MongoContainer } from "./managers/mongo.manager.js";
import {UserModel} from "./dbmodels/user.model.js";

export const UserManager = new MongoContainer(UserModel); */

import { UserModel } from "./dbmodels/user.model.js";
import { ProductModel } from "./dbmodels/products.model.js";
import { MyMongoClient } from "./clients/dbClientMongo.js";
import { options } from "../config/config.js";

export async function getApiDao(dbType) {
	let UserManager;
	let ProductManager;

	switch (dbType) {
		case "mongo":
			const { UserMongoDao } = await import(
				"./daos/users/userMongoDao.js"
			);
			const { ProductMongoDao } = await import(
				"./daos/products/productMongoDao.js"
			);
			const myClient = new MyMongoClient();
			await myClient.connect(options.mongo.url);
			ProductManager = await new ProductMongoDao(ProductModel);
			UserManager = await new UserMongoDao(UserModel);

			break;
		case "mysql":
			const { UserMySqlDao } = await import(
				"./daos/users/userMySqlDao.js"
			);
			const { ProductMySqlDao } = await import(
				"./daos/products/productMySqlDao.js"
			);

			ProductManager = new ProductMySqlDao("products");
			UserManager = new UserMySqlDao("users");

			break;
	}

	return { UserManager, ProductManager };
}
