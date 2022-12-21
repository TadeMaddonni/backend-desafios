import express from "express";
import { faker } from "@faker-js/faker";
faker.locale = "es";
const { name, vehicle, internet, datatype } = faker;

const app = express();

app.listen(8080, () => console.log("server listening"));

app.get("/usuarios", (req, res) => {
	let users = [];
	for (let i = 0; i < 10; i++) {
		users.push({
			nombre: name.firstName(),
			apellido: name.lastName(),
			color: vehicle.color(),
			email: internet.email(),
		});
	}
	res.json({ users });
});
