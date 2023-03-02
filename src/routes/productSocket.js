import { productContainer } from "../DB/managers/index.js";

const productSocket = async (socket, sockets) => {
	sockets.emit("products", productContainer.productos);

	socket.on("newProduct", async (data) => {
		productContainer.addProduct(data);

		socket.emit("products", productContainer.productos);
	});
};

export { productSocket };
