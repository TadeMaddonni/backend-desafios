import log4js from "log4js";
import { DbConfig } from "../config/envConfig.js";

log4js.configure({
	appenders: {
		//definimos las salidas
		consola: { type: "console" },
		warnings: {
			type: "file",
			filename: "./src/logs/warnings/warns.log",
			level: "warn",
		},
		errors: { type: "file", filename: "./src/logs/errors/error.log" },
		//definir una salida con un nivel
		consoleAll: {
			type: "logLevelFilter",
			appender: "consola",
			level: "all",
		},

		warningsFile: {
			type: "logLevelFilter",
			appender: "warnings",
			level: "warn",
		},
		errorsFile: {
			type: "logLevelFilter",
			appender: "errors",
			level: "error",
		},
	},
	categories: {
		default: {
			appenders: ["consoleAll", "warningsFile", "errorsFile"],
			level: "all",
		},
	},
});

let logger = log4js.getLogger();

export { logger };
