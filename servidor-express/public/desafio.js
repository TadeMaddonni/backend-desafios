const d = document;

const form = d.getElementById("form");
console.log(form);
form.addEventListener("submit", (e) => {
	e.preventDefault();
	const nombre = d.getElementById("nombreProducto").value;
	const precio = d.getElementById("precioProducto").value;
	const thumbnail = d.getElementById("thumbnailProducto").value;

	console.log("Form enviado");
	if (isNaN(precio) || nombre.length < 5 || thumbnail.length < 6) {
		alert("Los datos ingresados no son validos");
	} else {
		fetch("/api/productos", {
			method: "POST",
			body: JSON.stringify({
				name: nombre,
				price: precio,
				thumbnail: thumbnail,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((res) => res.json())
			.then((res) => alert(res.msg));
	}
});

const obtenerUnoForm = d.getElementById("obtenerUnoSolo");

obtenerUnoForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const ID = d.getElementById("idNumber").value;
	console.log(ID);
	if (isNaN(ID) || ID.length <= 0) {
		alert("Los datos ingresados no son validos");
	} else {
		window.location.href = `/api/productos/${ID}`;

	}
});
const modificarUno = d.getElementById("modificarUno");
modificarUno.addEventListener("submit", (e) => {
	e.preventDefault();
	const nombreModificado = d.getElementById("modificarNombre").value;
	const precioModificado = d.getElementById("modificarPrecio").value;
	const thumbnailModificado = d.getElementById("modificarThumbnail").value;
	console.log(nombreModificado, precioModificado, thumbnailModificado);
	const ID = d.getElementById("modificarId").value;
	console.log(ID);
	if (
		isNaN(ID) ||
		ID.length <= 0 ||
		isNaN(precioModificado) ||
		nombreModificado.length < 5 ||
		thumbnailModificado.length < 6
	) {
		alert("Los datos ingresados no son validos");
	} else {
		fetch(`/api/productos/${ID}`, {
			method: "PUT",
			body: JSON.stringify({
				name: nombreModificado,
				price: precioModificado,
				thumbnail: thumbnailModificado,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((res) => res.json())
			.then((res) => alert(res.msg));
	}
});

const eliminarUnoForm = d.getElementById("eliminarUno");

eliminarUnoForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const ID = d.getElementById("borrarId").value;
	console.log(ID);
	if (isNaN(ID) || ID.length <= 0) {
		alert("Los datos ingresados no son validos");
	} else {
		fetch(`/api/productos/${ID}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then((res) => alert(res.msg));
	}
});

const obtenerTodosBtn = d.getElementById("obtenerTodos");
obtenerTodosBtn.addEventListener("click", () => {
	window.location.href = "/api/productos";
});

// POST request using fetch()

/* const fs = require("fs");

class Contenedor {
	constructor(ruta) {
		this.ruta = ruta;
	}

	productos = [];

	escribirProductos() {
		fs.writeFileSync(this.ruta, JSON.stringify(this.productos, null, 2));
	}

	async leerArchivo() {
		try {
			const archivo = await fs.promises.readFile(this.ruta, "utf8");

			return JSON.parse(archivo);
		} catch (error) {
			console.log("eL archivo no existe pero sera creado!");
		}
	}

	async save(object) {
		try {
			const archivo = await this.leerArchivo();
			if (archivo != undefined) {
				this.productos = archivo;
				const productId =
					this.productos[this.productos.length - 1].id + 1 ||
					this.productos.length + 1;
				this.productos.push({ ...object, id: productId });
				this.escribirProductos();
				console.log("Productos agregados");
				return console.log(`El id de ${object?.name} es ${productId} `);
			} else {
				const productId = this.productos.length + 1;
				this.productos.push({ ...object, id: productId });
				this.escribirProductos();
				console.log("Productos agregados");
				return console.log(`El id de ${object?.name} es ${productId} `);
			}
		} catch (error) {
			console.log(error);
		}
	}

	async getById(id) {
		try {
			const data = await fs.promises.readFile(this.ruta, "utf-8");

			const res = await JSON.parse(data);

			const item = await res.find((el) => el.id === id);

			console.log(item);
		} catch (error) {
			console.log(error);
		}
	}

	async getAll() {
		try {
			const data = await fs.promises.readFile(this.ruta, "utf-8");

			const res = await JSON.parse(data);

			this.productos = await res;

			console.log(this.productos);
		} catch (error) {
			console.log(error);
		}
	}

	async deleteById(id) {
		try {
			const data = await fs.promises.readFile(this.ruta, "utf-8");

			const res = await JSON.parse(data);

			this.productos = await res.filter((el) => el.id != id);

			await fs.promises.writeFile(
				this.ruta,

				JSON.stringify(this.productos, null, 2)
			);
		} catch (error) {
			console.log(error);
		}
	}

	async deleteAll() {
		this.productos = [];
		fs.unlink(this.ruta, (error) => {
			if (error) {
				console.log("Error: " + error);
			} else {
				console.log("Productos y archivos borrados!");
			}
		});
	}
}

export const contenedor = new Contenedor("./productos.json");

 */
