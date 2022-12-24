import fs, { write } from "fs";
import knex from "knex";
import { mariaDBOptions } from "../mariaDb.js";
import { sqliteOptions } from "../sqlite.js";

import { faker } from "@faker-js/faker";
import { fileURLToPath } from "url";
import path from "path";
import { normalize, denormalize, schema } from "normalizr";
import { chatSchema, messageSchema } from "./normalizeSchema/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { commerce, image } = faker;

class Contenedor {
	constructor() {
		this.productos = [];
		this.messages = this.getMessages();
	}

	async getProducts() {
		for (let i = 0; i < 5; i++) {
			let product = {
				name: commerce.productName(),
				price: commerce.price(),
				thumbnail: image.avatar(),
			};
			this.productos.push(product);
		}
		return this.productos;
	}

	getMessages() {
		this.messages = JSON.parse(
			fs.readFileSync(__dirname + "/chat/chat.txt")
		);
		return this.messages;
	}

	addProductToDb(producto) {
		this.productos.push(producto);
		return "Product added correctly";
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

	/* 	async sendMessages() {
		this.getMessages();

		const normalizedData = normalize(
			{ id: "chatHistory", messages: this.messages },
			chatSchema
		);

		console.log(JSON.stringify(normalizedData, null, 2));

		return normalizedData;
	} */

	addMessage(message) {
		if (message.text != "") {
			const lastId = this.messages[this.messages.length - 1]?.id + 1 || 1;
			const newMessage = {
				...message,
				id: lastId,
				timestamp: new Date().toLocaleString(),
			};
			this.messages.push(newMessage);
			this.writeChat();
		} else {
			return;
		}
	}
}

export { Contenedor };
