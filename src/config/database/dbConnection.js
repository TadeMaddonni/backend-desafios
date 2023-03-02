import { DbConfig } from "../envConfig.js";
import mongoose from "mongoose";

const connectMongo = () => {
	mongoose.set("strictQuery", false);
	mongoose.connect(
		DbConfig.DATABASE_URL,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		(error) => {
			if (error) {
				console.log("Conexion fallida");
			} else {
				console.log("base de datos conectada correctamente");
			}
		}
	);
};

export { connectMongo };
