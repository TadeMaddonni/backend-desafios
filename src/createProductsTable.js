const { mariaDBOptions } = require("./mariaDb.js");
const knex = require("knex")(mariaDBOptions);

// Crear tabla (Ya creada)

/* knex.schema
	.createTable("products", (table) => {
		table.increments("id");
		table.string("name");
		table.string("thumbnail");
		table.integer("price");
	})
	.then(() => console.log("products table created"))
	.catch((err) => console.error(err))
	.finally(() => {
		knex.destroy();
	});
 */

/* knex("products") // Agregar producto
	.insert({
		name: "Coca Cola",
		thumbnail: "https://i.postimg.cc/76b2Ld3b/coca-cola.png",
		price: 20,
	})
	.then(() => {
		console.log("Producto Agregado");
	}); */
