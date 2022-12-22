import { normalize, schema } from "normalizr";

const authorSchema = new schema.Entity("authors");
const messageSchema = new schema.Entity("messages", {
	author: authorSchema,
});

export { authorSchema, messageSchema };
