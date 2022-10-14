const fs = require("fs");

/* class Usuarios {
  constructor(
    nombre = "",
    apellido = "",
    libros = [{ nombre: "", autor: "" }],
    mascotas = []
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName = () => {
    const fullName = `${this.nombre} ${this.apellido}`;
    return fullName;
  };

  addMascota = (nuevaMascota) => {
    const mascotasActualizadas = this.mascotas.push(nuevaMascota);
    return mascotasActualizadas;
  };

  addBook = (nuevoLibro) => {
    const librosActualzados = this.libros.push(nuevoLibro);
    return librosActualzados;
  };

  getBookNames = () => {
    const nombresDeLibros = this.libros.map((libro) => libro.nombre);
    return nombresDeLibros;
  };

  getMascotas = () => {
    const mascotas = this.mascotas;
    return mascotas;
  };
}

const usuario = new Usuarios(
  "Tadeo",
  "Maddonni",
  [{ nombre: "1984", autor: "George Orwell" }],
  ["Homero"]
);

const { getBookNames, addBook, getFullName, addMascota, getMascotas } = usuario;
addBook({ nombre: "Farenheit 451 ", autor: "Ray Bradbury" });
addMascota("Yin yan");
console.log("libros: " + getBookNames());
console.log("Nombre completo: " +getFullName());
console.log("Mascotas: " + getMascotas());
 */
/* 
fs.readFile("./fyh.txt", "utf8", (error, contenido) => {
  if (error) {
    console.log("Ha surgido un error");
  } else {
    console.log("Operacion exitosa: " + contenido);
  }
}); */

class Contenedor {
	constructor(ruta) {
		this.ruta = ruta;
	}

	productos = [];
	escribirProductos() {
		fs.writeFileSync(this.ruta, JSON.stringify(this.productos, null, 4));
	}
	async leerProductos() {
		try {
			const data = await fs.promises.readFile(this.ruta, "utf-8");
			const res = await JSON.parse(data);
			return res;
		} catch (error) {
			console.log("error: " + error.message);
		}
	}
	async leerArchivo() {
		try {
			const archivo = await fs.promises.readFile(this.ruta, "utf8");
			return archivo;
		} catch (error) {
			console.log("error: " + error.message);
		}
	}
	async save(object) {
		const archivo = await this.leerArchivo();
		if (archivo === undefined || archivo === "[]" || archivo.length < 1 ) {
			this.productos.push({ ...object, id: this.productos.length + 1 });
			console.log("El id del producto es " + this.productos.length);
			this.escribirProductos();
		} else {
			try {
				const res = await this.leerProductos();
				this.productos = await res;
				const productId =
					this.productos[this.productos.length - 1].id + 1;
				console.log("El id del producto agregado es: " + productId);
				this.productos.push({
					...object,
					id: productId,
				});

				this.escribirProductos();
			} catch (error) {
				console.log("Error: " + error);
			}
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
		this.escribirProductos();
	}
}

const contenedor = new Contenedor("./productos.json");
contenedor.save({ name: "Coca Cola", price: 23 });
