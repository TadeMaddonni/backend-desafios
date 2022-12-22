import { sqliteOptions } from "./sqlite.js";
import knex from "knex";
const knexSqlite = knex(sqliteOptions);

knexSqlite.schema
	.createTable("chat", (table) => {
		table.json("author");
		table.string("text");
	})
	.then(() => console.log("Chat table created"))
	.catch((err) => console.error(err))
	.finally(() => {
		knexSqlite.destroy();
	});
