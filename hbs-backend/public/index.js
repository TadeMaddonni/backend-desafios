console.log("Funcionando");

// Generar un template
const template = Handlebars.compile(
	`	<ul>
		<li>{{ nombre }}</li>
		<li>{{ apellido }}</li>
		<li>{{ edad }}</li>
		<li>{{ correo }}</li>
	</ul>
`
);

// Generar html, utilizando el template y un objeto de datos
const html = template({
	nombre: "Pedro",
	apellido: "Peréz",
	edad: 19,
	correo: "pedro@gmail.com",
});
console.log(html);

const rootDiv = document.getElementById("root");
rootDiv.innerHTML = html;
