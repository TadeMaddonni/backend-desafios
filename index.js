import admin from "firebase-admin";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(readFileSync("./firebasekey.json"));
console.log(serviceAccount);

// conectarse a la base de datos de firebase
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://coderprueba-2313a.firebase.io", //https://dbname.firebase.io
});
console.log("Base de datos conectada.");

const operacionesCRUD = async () => {
	const db = admin.firestore(); // Instancia de la base de datos
	const userCollection = db.collection("usuarios"); // Definimos la colección

	//Insert One
	/* 	const doc = userCollection.doc(); //Creamos instancia del documento con ID automatico.
	await doc.create({
		nombre: "Juana",
		dni: "2134500056",
	});
	console.log("Usuario agregado correctamente."); */

	// leer docs
	/* 	const snapshot = await userCollection.get();

	const docs = snapshot.docs;

	let usuarios = docs.map((doc) => {
		return {
			id: doc.id,
			nombre: doc.data().nombre,
			dni: doc.data().dni,
		};
	});
	console.log(usuarios); */

	//Update doc
	/* 	const doc = userCollection.doc("lbxDZHlbDzaur1JhGHzC");
	let result = await doc.update({ nombre: "Juana rodriguez" });
	console.log("El usuario ha sido actualizado de manera correcta"); */

	//Eliminar doc
	const doc = userCollection.doc("lbxDZHlbDzaur1JhGHzC");
	let result = await doc.delete();
	console.log("El usuario ha sido eliminado de manera correcta");

	// Idealmente las operaciones deberian ir dentro de un try-catch para el manejo de errores
};
operacionesCRUD();
