const expres = require("express");

const app = express();

const PORT = process.argv[2] || 8080;

app.use(express.static("public"));

app.listen(PORT, () => {
	console.log(`Server listening on port ${8080}`);
});

app.get("/perfil", (req, res) => {
	res.send(
		`Servidor ejecutandose en el puerto ${PORT} en el proceso ${process.pid}`
	);
});
