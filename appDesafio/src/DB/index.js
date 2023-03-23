import { DbConfig } from "../config/envConfig.js";
import { MyMongoClient } from "./clients/mongoClient.js";
import { MemoryContainer } from "./managers/memory.manager.js";
import { userModel } from "./models/UserModels.js";
import { MemoryDaoContainer } from "./daos/memoryDao.js";
import { UserMongoDao } from "./daos/usersMongoDao.js";
import { SqlDao } from "./daos/sqlDao.js";
//export const productContainer = await new MemoryContainer();

export const getDbApi = async (dbType) => {
	let productContainer;
	let userContainer;
	switch (dbType) {
		case "memory":
			const myClient = new MyMongoClient();

			await myClient.connect(DbConfig.DATABASE_URL);

			/* 			const { MemoryDaoContainer } = await import("./daos/memoryDao.js");
			const { UserMongoDao } = await import("./daos/usersMongoDao.js"); */

			productContainer = new MemoryDaoContainer();
			userContainer = new UserMongoDao(userModel);

			break;

		case "sql":
			const { SqlDaoContainer } = await import("./daos/sqlDao.js");

			productContainer = await new SqlDaoContainer();
			userContainer = await new UserMongoDao(userModel);
			break;
	}

	return { productContainer, userContainer };
};
