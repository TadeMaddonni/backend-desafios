import { productContainer } from "../DB/managers/index.js";

class chatServices {
	static async addMessage(message) {
		return await productContainer.addMessage(message);
	}

	static async getMessages() {
		return await productContainer.getMessages();
	}
}

export { chatServices };
