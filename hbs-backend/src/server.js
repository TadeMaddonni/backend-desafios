const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const path = require("path");

const viewsFolder = path.join(__dirname, "views");
console.log(viewsFolder);
app.listen(8080, () => {
	console.log("Server desplegado");
});
//app.use(express.static(__dirname + "/public"));

// Inicializando motor de plantillas
app.engine("handlebars", handlebars.engine());

// Donde tengo las vistas de mi proyecto
app.set("views", viewsFolder);

// Que motor de plantillas voy a utilizar
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
	res.render("home"); // Primer parametro: Nombre de la vista a mostrart
});
app.get("/contacto", (req, res) => {
	res.render("contacto"); // Primer parametro: Nombre de la vista a mostrart
});

let usuarios = [
	{name: "Pedro", edad: 17},
	{name: "Tomás", edad: 17},
	{name: "Bautista", edad: 17},
	{name: "Nicolás", edad: 17}
]

app.get("/usuarios", (req, res) => {
	res.render("usuarios", {
		people:usuarios
	}); // Primer parametro: Nombre de la vista a mostrart
});
