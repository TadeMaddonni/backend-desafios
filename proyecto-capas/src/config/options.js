import * as dotenv from "dotenv";

dotenv.config();

export const options = {
	fileSystem: {},
	firebase: {},
	mongoAtlas: {
		url: process.env.MONGO_URL,
	},
};
