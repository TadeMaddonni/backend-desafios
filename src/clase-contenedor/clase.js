const fs = require("fs");
const { mariaDBOptions } = require("../mariaDb.js");
const knexProducts = require("knex")(mariaDBOptions);

class Contenedor {
	constructor() {
		this.productos = [];
	}
	getProducts() {
		knexProducts
			.from("products")
			.select("*")
			.then((rows) => {
				this.productos =
					rows.map((el) => {
						return {
							id: el.id,
							name: el.name,
							thumbnail: el.thumbnail,
							price: el.price,
						};
						A;
					}) || [];
			});
		// .finally(() => knexProducts.destroy());
		return;
	}

	addProductToDb(producto) {
		knexProducts("products")
			.insert(producto)
			.then((res) => {
				console.log("producto agregado correctamente");
			})
			.finally(() => {
				this.getProducts();
				return "Producto agregado con exito";
			});
		/* 			.finally(() => {
				knexProducts.destroy();
			}); */
	}
	readFile() {
		const archivo = JSON.parse(
			fs.readFileSync(__dirname + "/chat/chat.txt", "utf-8")
		);
		if (archivo) {
			return archivo;
		} else {
			return [];
		}
	}
	messages = this.readFile();

	writeChat() {
		fs.writeFileSync(
			__dirname + "/chat/chat.txt",
			JSON.stringify(this.messages, null, 2)
		);
	}
	getAll() {
		return this.productos;
	}

	addProduct(product) {
		const itExists = this.productos.some(
			(prod) => prod.name === product.name
		);
		if (!itExists) {
			if (
				product.name != "" &&
				product.price != "" &&
				product.thumbnail != ""
			) {
				const producto = {
					name: product.name,
					thumbnail: product.thumbnail,
					price: parseInt(product.price),
				};
				this.addProductToDb(producto);
				this.getProducts();
				
			} else {
				return "Producto incorrecto";
			}
		} else {
			return "Already exits";
		}
	}

	addMessage(message) {
		if (message.text != "") {
			this.messages.push(message);
			this.writeChat();
		} else {
			return;
		}
	}
}

module.exports = Contenedor;
