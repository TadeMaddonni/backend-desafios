import { DbConfig } from "../config/envConfig.js";
import { getDbApi } from "../DB/index.js";

setTimeout(async () => {
	const managers = await getDbApi(DbConfig.DB_TYPE);
}, 4000);

class chatServices {
	static async addMessage(message) {
		return await productContainer.addMessage(message);
	}

	static async getMessages() {
		return await productContainer.getMessages();
	}
}

export { chatServices };
