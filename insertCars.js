const { options } = require("./db/mariaDB");
const knex = require("knex")(options);

const cars = [
	{ name: "Audi", price: 40000 },
	{ name: "Mercedes", price: 40000 },
	{ name: "Wolkswagem", price: 40000 },
	{ name: "Ford", price: 40000 },
	{ name: "Bentley", price: 40000 },
	{ name: "Volvo", price: 40000 },
	{ name: "Dodge", price: 40000 },
	{ name: "Porshce", price: 40000 },
];

knex("cars").insert(cars)
.then(() => {console.log("data inserted")})
