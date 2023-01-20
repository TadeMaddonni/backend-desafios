import express from "express";

const app = express();
const PORT = parseInt(process.argv[2]) || 8080;

app.get("/", (req, res) => {
	for (let i = 0; i < 1e8; i++) {}
	res.send(`respuesta desde el proceso ${process.pid}`);
});

app.listen(PORT, () =>
	console.log(`Server listening on port ${PORT} on process ${process.pid}`)
);
