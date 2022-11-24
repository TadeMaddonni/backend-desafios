const { options } = require("./db/mariaDB.js");
const knex = require("knex")(options);

knex.from("cars")
	.select("*")
	.then((rows) => {
		rows.forEach((row) => console.log(`${row.id} ${row.name} = $${row.price}`));
	})
	.catch((err) => console.log(err))
	.finally(() => {
		knex.destroy();
	});
