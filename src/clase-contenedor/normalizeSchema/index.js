import { normalize, schema } from "normalizr";

const authorSchema = new schema.Entity("authors");
const messageSchema = new schema.Entity("messages", {
	author: authorSchema,
});
const chatSchema = new schema.Entity("chats", {
	messages: [messageSchema],
});

export { authorSchema, messageSchema, chatSchema };
