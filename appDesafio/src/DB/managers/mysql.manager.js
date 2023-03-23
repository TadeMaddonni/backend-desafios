import fs, { write } from "fs";

import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SqlManager {
	getProducts() {}
	constructor() {}

	async addProduct(product) {}

	async addMessage(message) {}

	async getMessages() {}
}

export { SqlManager };
