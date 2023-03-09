import { DbConfig } from "../config/envConfig.js";

import { productContainer, userContainer } from "../server.js";
class chatServices {
	static async addMessage(message) {
		return await productContainer.addMessage(message);
	}

	static async getMessages() {
		return await productContainer.getMessages();
	}
}

export { chatServices };
