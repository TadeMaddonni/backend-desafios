const fs = require("fs");
const Contenedor = require("./clase-contenedor");

//Crear objeto contenedor

const contenedor = new Contenedor("./productos.json");

// importar express
const express = require("express");

// Crear servidor
const app = express();

// Ejecutar el servidor
app.listen(8080, (req, res) => {
	console.log("Servidor desplegado en el puerto 8080");
});

app.get("/", (req, res) => {
	res.send(contenedor);
	console.log("Peticion recibida");
	console.log(contenedor);
});

app.get("/productos", async (req, res) => {
	const productos = await contenedor.getAll();
	console.log(productos);
	res.json(productos);
});

app.get("/productoRandom", async (req, res) => {
	const productos = await contenedor.getAll();
	const numeroRandom = await Math.floor(Math.random() * productos.length - 1);
	const itemRandom = await productos[numeroRandom];
	res.json(itemRandom);
});
