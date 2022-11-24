const { options } = require("./db/mariaDB.js");
const knex = require("knex")(options);
console.log(options);



knex.schema
	.createTable("cars", (table) => {
		table.increments("id");
		table.string("name");
		table.integer("price");
	})
	.then(() => {
		console.log("Table created");
	})
	.catch((err) => console.log(err))
	.finally(() => {
		knex.destroy();
	});
