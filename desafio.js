import { optionSplite } from "./db/sqliteConfig.js";
import knex from "knex";

const database = knex(optionSplite);

const articulosArray = [
	{ nombre: "libro", codigo: "728xd", precio: 103.27, stock: 3 },
	{ nombre: "libreta", codigo: "32000", precio: 45.27, stock: 12 },
	{ nombre: "esfero", codigo: "5485", precio: 2.5, stock: 15 },
	{ nombre: "escuadra", codigo: "88892", precio: 5.17, stock: 5 },
	{ nombre: "borrador", codigo: "8721", precio: 1.27, stock: 10 },
];

// Multiples operaciones.
const operaciones = async () => {
	// Validar tabla creada.

	let articlesTable = await database.schema.hasTable("articulos");

	if (articlesTable) {
		await database.schema.dropTable("articulos");
	}
	// Crear tabla articulos
	try {
		await database.schema.createTable("articulos", (table) => {
			table.increments("id");
			table.string("nombre", 15).nullable(false);
			table.string("codigo", 10).nullable(false);
			table.float("precio");
			table.integer("stock");
		});
		console.log("Table created");

		//Insertar articulos
		await database("articulos").insert(articulosArray);

		//Listar articulos
		const results = await database.from("articulos").select("*");
		const articles = results.map((elm) => ({ ...elm }));
		console.log(articles);

		// Borrar articulo con id 3
		await database.from("articulos").where("id", 3).del();
		console.log("Articulo eliminado");
        
		//Actualizar producto con id 2 y stock 0
		await database.from("articulos").where("id", 2).update({ stock: 0 });
        
		//Listar articulos
		const Newresults = await database.from("articulos").select("*");
		const Newarticles = Newresults.map((elm) => ({ ...elm }));
		console.log(Newarticles);
		
        
        database.destroy(); // Cerramos la conexión.
	} catch (error) {
		console.log(error);
	}
};
operaciones();




/* 
const optionSplite = {
	client: "sqlite",
	connection: {
		filename: "./database/ecommerce.sqlite",
	},
	useNullAsDefault: true,
};
export { optionSplite };
 */
