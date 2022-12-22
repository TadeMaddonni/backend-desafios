import { normalize, schema } from "normalizr";

const authorSchema = schema.Entity("authors");
const messageSchema = schema.Entity("messages", {
	author: authorSchema,
});

export { authorSchema, messageSchema };
