// import { messageSchema } from "../clase-contenedor/normalizeSchema";
// const { denormalize } = require("normalizr");

console.log("Funcionando");
// Ejecutando socket del lado del cliente.
const socketClient = io();

//Logged in variable
let login = false;

const form = document.getElementById("form");
const productNameInput = document.getElementById("productNameInput");
const productPriceInput = document.getElementById("productPriceInput");
const productThumbnailInput = document.getElementById("productThumbnailInput");

const addProduct = (e) => {
	e.preventDefault();
	const product = {
		name: productNameInput.value,
		thumbnail: productThumbnailInput.value,
		price: productPriceInput.value,
	};
	socketClient.emit("newProduct", product);
};
form.addEventListener("submit", addProduct);

socketClient.on("productos", (data) => {
	console.log(data);
	const productsContainer = document.getElementById("productsContainer");
	productsContainer.innerHTML = "";
	data.forEach((el) => {
		const div = document.createElement("div");
		div.classList.add("product");
		div.innerHTML = `
            <p class="productInfo">${el.name}</p>
            <p class="productInfo">$${el.price}</p>
            <div class="productImgContainer">
            <img class="productImg" src=${el.thumbnail}>
            
            </div>
            <hr class="line" />
		`;
		productsContainer.appendChild(div);
	});
});

/* Chat  part */

const chatForm = document.getElementById("chatForm");
const inputChatEmail = document.getElementById("inputChatEmail");
const inputChatText = document.getElementById("inputChatText");
const inputNombre = document.getElementById("inputChatNombre");
const inputEdad = document.getElementById("inputChatEdad");

const inputApellido = document.getElementById("inputApellido");
const inputAlias = document.getElementById("inputAlias");
console.log(chatForm);

const addMessage = (e) => {
	e.preventDefault();
	let email = inputChatEmail.value;
	let text = inputChatText.value;
	let nombre = inputNombre.value;
	let apellido = inputApellido.value;
	let edad = inputEdad.value;
	let alias = inputAlias.value;
	const message = {
		author: {
			id: email,
			email: email,
			nombre: nombre,
			apellido: apellido,
			edad: edad,
			alias: alias,
		},
		text: text,
	};
	socketClient.emit("newMessage", message);
	inputChatText.value = "";
	return false;
};

chatForm.addEventListener("submit", addMessage);

const authorSchema = new normalizr.schema.Entity(
	"authors",
	{},
	{ idAttribute: "email" }
); //id:con el valor del campo email.
const messageSchema = new normalizr.schema.Entity("messages", {
	author: authorSchema,
});
//esquema global o padre
const chatSchema = new normalizr.schema.Entity("chats", {
	messages: [messageSchema],
});

socketClient.on("messages", async (data) => {
	let messagesData = await normalizr.denormalize(
		data.result,
		chatSchema,
		data.entities
	);
	console.log(messagesData.messages);
	const mensajes = document.getElementById("mensajes");

	mensajes.innerHTML = "";
	messagesData?.messages?.forEach((el) => {
		const div = document.createElement("div");
		div.classList.add("message");
		div.innerHTML = `
            <div class="left">
                <p class="bold">${el.author.id}</p>
                <p class="italic">[${el.author.alias}] :</p>
            </div>
            <p class="text">${el.text}</p>
		`;
		mensajes.appendChild(div);
	});
});

socketClient.on("login", async (data) => {
	console.log(data);
	let loginFormComponent = document.getElementById("loginForm");
	const loggedInMessage = document.getElementById("loggedInMessage");
	const loggedInComponent = document.getElementById("loggedInComponent");
	if (data) {
		loginFormComponent.classList.add("hidden");
		loggedInComponent.classList.remove("hidden");
		loggedInMessage.innerText = data;
		loggedInComponent.classList.add("visible");
	} else {
		loginFormComponent.classList.remove("hidden");
	}
});
