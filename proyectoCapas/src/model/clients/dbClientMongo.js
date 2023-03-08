import mongoose from "mongoose";
import { options } from "../../config/config.js";

// Clase para controlar la conexion a la base de datos.
class MyMongoClient {
	constructor() {
		this.client = mongoose;
	}

	async connect(url) {
		try {
			await this.client.connect(url);
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
