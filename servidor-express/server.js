// importar express
const express = require("express");
const { Router } = express;

// Crear servidor
const app = express();
const router = Router();

// APP USES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Ejecutar el servidor
app.listen(8080, (req, res) => {
	console.log("Servidor desplegado en el puerto 8080");
});
// Lista de productos

let PRODUCTOS = [
	{
		name: "Agua mineral",
		price: 19,
		id: 1,
	},
	{
		name: "Coca Cola sin azucar",
		price: 21,
		id: 2,
	},
	{
		name: "Agua saborizada de pomelo",
		price: 20,
		id: 3,
	},
];
// configuraciones
//Configurar rutas del sevidor con sus respectivos métodos!
app.get("/", (req, res) => {
	console.log("Req recibida");
	res.sendFile(__dirname + "/index.html");
});

router.get("/productos", (req, res) => {
	res.send({ PRODUCTOS });
});

router.get("/productos/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const producto = PRODUCTOS.find((el) => el.id === id);
	if (producto) {
		res.send({ producto });
	} else {
		res.send({ error: "Producto no encontrado" });
	}
});

router.post("/productos", async (req, res) => {
	const item = await req.body;
	const yaIngresado = PRODUCTOS.some((el) => el.name === item.name);
	if (yaIngresado) {
		res.send({ msg: "El producto ya estaba en la base de datos" });
	} else {
		PRODUCTOS.push({
			...item,
			price: parseInt(item.price),
			id:
				PRODUCTOS.length > 0
					? PRODUCTOS[PRODUCTOS.length - 1].id + 1
					: PRODUCTOS.length + 1,
		});
		console.log(PRODUCTOS);
		res.send({
			msg: `el producto ${
				item.name
			} ha sido agregado con éxito bajo el identificador numero ${
				PRODUCTOS[PRODUCTOS.length - 1].id
			}`,
		});
	}
});

router.put("/productos/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const newItem = req.body;
	const existe = PRODUCTOS.some((el) => el.id === id);
	console.log(existe);
	if (existe) {
		const productoPrevio = PRODUCTOS[id - 1];
		console.log(PRODUCTOS);
		PRODUCTOS = PRODUCTOS.map((producto) => {
			if (producto.id === id) {
				return {
					...newItem,
					id: id,
				};
			} else {
				return producto;
			}
		});
		res.send({
			msg: `El producto ${productoPrevio.name} con un precio de ${productoPrevio.price} ha sido intercambiado por el producto ${newItem.name} con un precio de ${newItem.price}`,
		});
	} else {
		res.send({ error: "Producto no encontrado" });
	}
});

router.delete("/productos/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const existe = PRODUCTOS.some((el) => el.id === id);
	if (!existe) {
		res.send({ error: "Producto no encontrado" });
	} else {
		const itemAEliminar = PRODUCTOS.find((el) => el.id === id);
		PRODUCTOS = PRODUCTOS.filter((el) => el.id != id);
		res.send({
			msg: `El producto ${itemAEliminar.name} ha sido correctamente eliminado`,
		});
		console.log(PRODUCTOS);
	}
});

router.get("/", (req, res) => {
	res.send("Direccion raiz de la api");
});

app.use("/api", router);

/* // Deasfio 3 martes 25/10
let frase = "Frase inicial";

app.get("/api/frase", (req, res) => {
	res.send({ frase });
});

app.get("/api/palabras/:pos", (req, res) => {
	console.log("req recibida");
	const pos = parseInt(req.params.pos);
	let palabras = frase.split(" ");
	const palabraSeleccionada = palabras[pos - 1];
	res.json({ palabraSeleccionada });
});

app.post("/api/palabras/", (req, res) => {
	let { palabra } = req.body;
	frase = frase.concat(" ", palabra);
	let palabras = frase.split;
	res.json({ palabraAgregada: palabra, pos: palabras.length });
});

app.put("/api/palabras/:pos", (req, res) => {
	let { palabra } = req.body;
	const pos = parseInt(req.params.pos);

	if (pos > frase.length) {
		res.json({ error: "Posicion invalida" });
	} else {
		let palabras = frase.split(" ");
		console.log(palabras);

		let anterior = palabras[pos - 1];
		console.log(anterior);
		palabras[pos] = palabra;

		res.json({
			palabraActualizada: palabras[pos],
			anterior: anterior,
			nuevaFrase: palabras.join(" "),
		});
	}
});

app.delete("/api/palabras/:pos", (req, res) => {
	const pos = parseInt(req.params.pos);
	console.log(pos);

	let palabras = frase.split(" ");

	let anterior = palabras[pos];

	let newPalabras = palabras.filter((e, ix) => ix != pos - 1);

	res.json({ nuevaFrase: newPalabras.join(" ") });
});

 */
