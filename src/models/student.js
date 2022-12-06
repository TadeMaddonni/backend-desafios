import mongoose from "mongoose";

// Colección estudiantes
const studentsCollection = "students";

const studentSchema = new mongoose.Schema({
	// que propiedades va a tener el documento estudiante
	// nombre:String
	nombre: {
		type: String,
		required: true,
	},
	apellido: {
		type: String,
		required: true,
	},
	edad: {
		type: Number,
		required: true,
	},
	dni: {
		type: String,
		required: true,
		unique: true, // evita duplicados
	},
	curso: {
		type: String,
		required: true,
	},
	nota: {
		type: Number,
		required: true,
	},
});

// Creamos el modelo para interactuar con la coleccion estudiantes
export const StudentModel = mongoose.model(studentsCollection, studentSchema);
