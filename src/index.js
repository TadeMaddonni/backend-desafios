import mongoose from "mongoose";
import { StudentModel } from "./models/student.js";

// Definimos la url de la base de datos
const mongoUrl = "mongodb://127.0.0.1:27017/colegioDB";

// Conectamos a la base de datos
mongoose.connect(mongoUrl);
console.log("conectado");
//
const operacionesCRUD = async () => {
	const newStudents = [
		{
			nombre: "Pedro",
			apellido: "Mei",
			edad: 21,
			dni: "31155898",
			curso: "1A",
			nota: 7,
		},
		{
			nombre: "Ana",
			apellido: "Gonzalez",
			edad: 32,
			dni: "27651878",
			curso: "1A",
			nota: 8,
		},
		{
			nombre: "José",
			apellido: "Picos",
			edad: 29,
			dni: "34554398",
			curso: "2A",
			nota: 6,
		},
		{
			nombre: "Lucas",
			apellido: "Blanco",
			edad: 22,
			dni: "30355874",
			curso: "3A",
			nota: 10,
		},
		{
			nombre: "María",
			apellido: "García",
			edad: 36,
			dni: "29575148",
			curso: "1A",
			nota: 9,
		},
		{
			nombre: "Federico",
			apellido: "Perez",
			edad: 41,
			dni: "320118321",
			curso: "2A",
			nota: 5,
		},
		{
			nombre: "Tomas",
			apellido: "Sierra",
			edad: 19,
			dni: "38654790",
			curso: "2B",
			nota: 4,
		},
		{
			nombre: "Carlos",
			apellido: "Fernández",
			edad: 33,
			dni: "26935670",
			curso: "3B",
			nota: 2,
		},
		{
			nombre: "Fabio",
			apellido: "Pieres",
			edad: 39,
			dni: "4315388",
			curso: "1B",
			nota: 9,
		},
		{
			nombre: "Daniel",
			apellido: "Gallo",
			edad: 25,
			dni: "37923460",
			curso: "3B",
			nota: 2,
		},
	];

	// let result = await StudentModel.insertMany(newStudents); AGREGAR (Create)

	// let result = await StudentModel.find() Leer (Read)

	//let students = await StudentModel.find({}, {nombre: 1, edad: 1}) Leer con proyecciones (Read)

	// let students = await StudentModel.find({}, {nombre: 1, _id:0}).sort({nombre: 1}) // Leer con un orden determinado (Read)

	/* 	let students = await StudentModel.find({}, { nombre: 1, edad: 1, _id: 0 })
		.sort({
			edad: 1,
		})
		.limit(1); // Leer con un orden determinado (Read)  */


    // let students = await StudentModel.find({curso: "2A"}, {nombre: 1, _id: 0}) //  Leer con filtros     
     let promedioStudents = await StudentModel.aggregate(
        [
            // 1 fase crear los grupos.
            {
                $group:{
                    _id:"$curso", 
                    //students: [{}]
                    promedio: {$avg:"$nota"} 

                    
                }
            },

            // 2 fase obtener el curso 2A
            {
                $match: {
                    "_id":"1A"
                }
            }
        ]
    ) // Crear grupos segun alguna condición (Aggregate) 
	console.log(promedioStudents);

	mongoose.connection.close();
};
operacionesCRUD();
