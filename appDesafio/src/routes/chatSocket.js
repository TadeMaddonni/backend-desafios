import { chatServices } from "../services/chat.services.js";
import { normalizeMessages } from "../utils/normalizeSchema/index.js";

const chatSocket = async (socket, sockets) => {
	sockets.emit("messages", await normalizeMessages());

	socket.on("newMessage", async (msg) => {
		await chatServices.addMessage(msg);
		sockets.emit("messages", await normalizeMessages());
	});
};

export { chatSocket };
