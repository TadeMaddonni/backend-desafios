import express from "express";
const app = express();

app.listen(8080, () => console.log("server listening"));

const nombres = ["luis", "Lucia", "Juan", "Augusto", "Ana"];
const apellidos = ["Pieres", "Cacurri", "Bezzola", "Alberca", "Mei"];
const colores = ["rojo", "verde", "azul", "amarillo", "magenta"];

app.get("/usuarios", (req, res) => {
	let users = [];
	for (let i = 0; i < 10; i++) {
		users.push({
			nombre: nombres[parseInt(Math.random() * nombres.length)],
			apellido: apellidos[parseInt(Math.random() * apellidos.length)],
			color: colores[parseInt(Math.random() * colores.length)],
		});
	}
	res.json({ users });
});
