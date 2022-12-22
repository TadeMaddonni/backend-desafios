import fs, { write } from "fs";
import knex from "knex";
import { mariaDBOptions } from "../mariaDb.js";
import { sqliteOptions } from "../sqlite.js";
import { faker } from "@faker-js/faker";
import { fileURLToPath } from "url";
import path from "path";
import { normalize, denormalize, schema } from "normalizr";
import { messageSchema } from "./normalizeSchema/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const knexProducts = knex(mariaDBOptions);
const knexChat = knex(sqliteOptions);

const { commerce, image } = faker;

class Contenedor {
	constructor() {
		this.productos = [];
		this.messages = this.getMessages();
	}

	getProducts() {
		for (let i = 0; i < 5; i++) {
			let product = {
				name: commerce.productName(),
				price: commerce.price(),
				thumbnail: image.avatar(),
			};
			this.productos.push(product);
		}
		/* knexProducts
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
			}); */
		// .finally(() => knexProducts.destroy());
		return;
	}

	getMessages() {
		this.messages = JSON.parse(
			fs.readFileSync(__dirname + "/chat/chat.txt")
		);
		console.log(this.messages);
	}

	sendMessages() {
		this.getMessages();
	}

	addProductToDb(producto) {
		this.productos.push(producto);
		/* 		knexProducts("products")
			.insert(producto)
			.then((res) => {
				console.log("producto agregado correctamente");
			})
			.finally(() => {
				this.getProducts();
				return "Producto agregado con exito";
			}); */
		/* 			.finally(() => {
				knexProducts.destroy();
			}); */
	}

	/* 	async setMessages() {
		const results = await knexChat("chat").select("*");
		const chatMessages = results.map((elm) => ({ ...elm }));
		this.messages = chatMessages;
	} */

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

	writeChat() {
		fs.writeFileSync(
			__dirname + "/chat/chat.txt",
			JSON.stringify(this.messages, null, 2),
			"utf-8"
		);
	}

	addMessageToDb(message) {
		knexChat("chat")
			.insert(message)
			.then(() => {
				console.log("Mensaje enviado a la base de datos");
			});
	}

	sendMessages() {
		this.getMessages();
		console.log(this.messages);
		const normalizedData = normalize(this.messages, messageSchema);
		console.log(JSON.stringify(normalizedData, null, 2));

		return normalizedData;
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

export { Contenedor };
