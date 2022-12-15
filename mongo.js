import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";
import { UserModel } from "./models/user.js";

mongoose.connect(
	"mongodb+srv://tade:tade1506@coderbase.1m86azc.mongodb.net/ecommerce?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(error) => {
		if (error) return console.log("hubo un error al conectarse");
		console.log("conexion exitosa");
	}
);

const operacionesCRUD = async () => {
	const users = await UserModel.find();
	console.log(users);

	//Insert one

	await UserModel.create({
		nombre: "Fredy",
		apellido: "Castro",
		dni: "30548233",
	});
	console.log("user Created");
};
operacionesCRUD();

// Crear schema

// Crear modelo
