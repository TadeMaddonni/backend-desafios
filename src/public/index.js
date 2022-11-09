// Ejecutando socket del lado del cliente.
const socketClient = io();
let messages = [];
socketClient.on("primerMensaje", (data) => {
	console.log(data);
});

socketClient.on("chat", (data) => {
	messages = data.map((el) => el.msg);
	console.log(messages);

	const root = document.getElementById("root");
	root.innerHTML = "";
	messages.forEach((el) => {
		const div = document.createElement("div");
		div.innerText = el;
		root.appendChild(div);
	});
});

const inputChat = document.getElementById("chatInput");

inputChat.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		socketClient.emit("mensaje", inputChat.value);
		inputChat.value = "";
	}
});
