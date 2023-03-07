import { ProductServices } from "../services/products.services.js";

const productSocket = async (socket, sockets) => {
	sockets.emit("products", ProductServices.productos);

	socket.on("newProduct", async (data) => {
		ProductServices.addProduct(data);

		socket.emit("products", ProductServices.productos);
	});
};

export { productSocket };
