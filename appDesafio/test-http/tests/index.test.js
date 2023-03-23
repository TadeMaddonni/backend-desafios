import axios from "axios";

const url = "http://localhost:8080";

const getProducts = async () => {
	try {
		const response = await axios.get(`${url}/productos`);
		console.log(response);
		return response ? true : false;
	} catch (error) {
		throw new Error(`An error occured while obtaining the products`);
	}
};

const product = {
	name: "Producto test",
	price: 100,
	thumbnail:
		"https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-512.png",
};

const addProduct = async (product) => {
	try {
		const response = await axios.post(`${url}/productos`, product);
		console.log(response);
		return response ? true : false;
	} catch (error) {
		throw new Error(`An error occured while adding the product`);
	}
};
getProducts();
