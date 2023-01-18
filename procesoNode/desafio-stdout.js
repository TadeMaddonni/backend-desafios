process.stdout.write("Ingrese el array de números");

process.stdin.on("data", (data) => {
	if (data.toString().trim()) {
		const dataArray = data.toString();
		const parsedArray = JSON.parse(dataArray);

		const suma = parsedArray.reduce((acc, i) => acc + parseInt(i), 0);

		if (isNaN(suma)) {
			console.log({
				error: "Has ingresado datos no validos",
			});
		} else {
			console.log({
				datos: {
					numeros: parsedArray,
					promedio: suma / parsedArray.length,
					maximo: Math.max(...parsedArray),
					minimo: Math.min(...parsedArray),
					ejecutable: process.cwd(),
					pid: process.pid,
				},
			});
		}
		console.log(parsedArray);
	} else {
		console.log({
			error: "Entrada vacia",
		});
		process.exit();
	}
});
