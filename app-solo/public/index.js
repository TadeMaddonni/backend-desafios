// Ejecutando socket del lado del cliente.
const socketClient = io();
let messages = [];
socketClient.on("primerMensaje", (data) => {
	console.log(data);
});

socketClient.on("messages", (data) => {
	const root = document.getElementById("root");
	root.innerHTML = "";
	data.forEach((el) => {
		const div = document.createElement("div");
		div.classList.add("message");
		div.innerHTML = `
			<div class="bold">${el.author}:</div>
			<div class="message">${el.text}</div>
		`;
		root.appendChild(div);
	});
});

const chatForm = document.getElementById("chatForm");
const inputName = document.getElementById("inputName");
const inputMsg = document.getElementById("inputMsg");

const addMessage = (e) => {
	e.preventDefault();
	const message = {
		author: inputName.value,
		text: inputMsg.value,
	};

	socketClient.emit("newMessage", message);
	return false;
};

chatForm.addEventListener("submit", addMessage);
