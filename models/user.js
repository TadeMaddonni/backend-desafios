import mongoose from "mongoose";

// crear la coneccion donde almacenaremos la información
const userCollection = "usuarios";

// Crear el esquema de cada documento
const userSchema = new mongoose.Schema({
	nombre: String,
	apellido: String,
	dni: String,
});

// Crear el modelo
export const UserModel = mongoose.model(userCollection, userSchema);
