import { normalize, schema } from "normalizr";
import { DbConfig } from "../../config/envConfig.js";
import { getDbApi } from "../../DB/index.js";
import { chatServices } from "../../services/chat.services.js";

const managers = await getDbApi(DbConfig.DB_TYPE);
const { productContainer } = managers;

const authorSchema = new schema.Entity("authors");
const messageSchema = new schema.Entity("messages", {
	author: authorSchema,
});
const chatSchema = new schema.Entity("chats", {
	messages: [messageSchema],
});

const normalizeData = (data) => {
	const normalizedData = normalize(
		{ id: "chatHistory", messages: data },
		chatSchema
	);
	return normalizedData;
};
export const normalizeMessages = async () => {
	const messages = await chatServices.getMessages();
	const normalizedMessages = normalizeData(messages);
	return normalizedMessages;
};

export { authorSchema, messageSchema, chatSchema };
