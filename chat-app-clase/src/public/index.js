const clientSocket = io();

const rootElement = document.getElementById("root");

function render(array) {
	rootElement.innerHTML = "";
	array.forEach((element) => {
		const div = document.createElement("div");
		div.classList.add("message");
		div.innerHTML = `
            <p>${element.author}: </P>
            <p> ${element.text}</P>
        `;
		rootElement.appendChild(div);
	});
}

clientSocket.on("messages", (data) => {
	render(data);
});

const form = document.getElementById("form");

let user = "";

swal.fire({
	title: "Bienvenido",
	text: "Ingrese su nombre de usuario",
	input: "text",
	allowOutsideClick: false,
}).then((res) => {
	user = res.value;
	const userName = document.getElementById("userName");
	userName.innerText = user;
});

function addMessage(e) {
	e.preventDefault();
	const text = document.getElementById("messageInput");
	const message = {
		author: user,
		text: text.value,
	};
	clientSocket.emit("newMessage", message);
	text.value = "";
}

form.addEventListener("submit", addMessage);
