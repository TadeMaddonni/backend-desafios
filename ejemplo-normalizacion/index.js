import { normalize, schema, denormalize } from "normalizr";

const blogpost = {
	id: "1",
	title: "My blog post",
	description: "Short blogpost description",
	content: "Hello world",
	author: { id: "1", name: "John Doe" },
	comments: [
		{ id: "1", author: { id: "2", name: "Maria" }, content: "Nice post!" },
		{
			id: "2",
			author: { id: "3", name: "Jose" },
			content: "I totally agree with you!",
		},
		{
			id: "3",
			author: { id: "1", name: "John Doe" },
			content: "Muchas gracias por los comentarios",
		},
	],
};

//Definir esquemas.
const authorSchema = new schema.Entity("authors");
const commentSchema = new schema.Entity("comments", {
	author: authorSchema,
});

//Esquema padre o global
const postSchema = new schema.Entity("posts", {
	author: authorSchema,
	comments: [commentSchema],
});

//Proceso de normalización (1er Argumento => info a normalizar,  2do Argumento => schema global )
const dataNormalizada = normalize(blogpost, postSchema);
console.log("data normalizada:", JSON.stringify(dataNormalizada, null, 2));

const dataDesnormalizada = denormalize(
	dataNormalizada.result,
	postSchema,
	dataNormalizada.entities
);

console.log(
	"data desnormalizada: ",
	JSON.stringify(dataDesnormalizada, null, 2)
);
