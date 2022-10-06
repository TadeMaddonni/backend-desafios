class Usuarios {
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
