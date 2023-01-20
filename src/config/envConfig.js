import * as dotenv from "dotenv";
import parseArgs from "minimist";

dotenv.config();

const options = {
	default: {
		port: 8000,
	},
	alias: {
		p: "port",
	},
};

const args = parseArgs(process.argv.slice(2), options);

const DbConfig = {
	mongoAtlas: {
		url: process.env.DATABASE_URL || "Base de datos no existente",
	},
	port: args.port,
	mode: args.mode || "dev",
};

export { DbConfig };
