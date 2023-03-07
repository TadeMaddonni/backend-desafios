import * as dotenv from "dotenv";
import parseArgs from "minimist";

dotenv.config();

const options = {
	default: {
		port: 8000,
		mode: "fork",
	},
	alias: {
		p: "port",
		m: "mode",
	},
};

const args = parseArgs(process.argv.slice(2), options);

const DbConfig = {
	DATABASE_URL: process.env.DATABASE_URL || "Base de datos no existente",
	DB_TYPE: process.env.DB_TYPE || "memory",
	port: process.env.PORT || 8080,
	mode: process.env.mode || "fork",
};

export { DbConfig };
