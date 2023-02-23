import mongoose from "mongoose";
import { options } from "./options.js";

export const connectMongo = () => {
	mongoose.set("strictQuery", false);
	mongoose.connect(options.mongoAtlas.url, (err) => {
		if (err) {
			return console.log(
				`Ha ocurrido un error al conectar a la base de datos: ${err}`
			);
		}
		console.log("Conexión a la base de datos exitosa");
	});
};
