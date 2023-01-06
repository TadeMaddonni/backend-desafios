import { productContainer } from "../server.js";

const productSocket = async (socket, sockets) => {
	sockets.emit("products", await productContainer.getProducts());

	socket.on("newProduct", async (data) => {
		await productContainer.addProduct(data);

		socket.emit("products", await productContainer.getProducts());
	});
};

export { productSocket };
