import mongoose from "mongoose";
import { DbConfig } from "../../config/envConfig.js";

// Clase para controlar la conexion a la base de datos.
class MyMongoClient {
	constructor() {
		this.client = mongoose;
	}

	async connect(url) {
		try {
			this.client.set({ strictQuery: false });
			await this.client.connect(DbConfig.DATABASE_URL);
			console.log("Base de datos MongoDb conectada");
		} catch (error) {
			throw new Error(`Error al conectar a MongoDB ${error}`);
		}
	}

	async disconnect() {
		try {
			await this.client.connection.close();
			console.log("Base de datos MongoDb desconectada");
		} catch (error) {
			throw new Error(`Error al desconectar de MongoDB; ${error}`);
		}
	}
}

export { MyMongoClient };
