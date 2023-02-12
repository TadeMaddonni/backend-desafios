import express from "express";
import { transporter } from "./messages/email.js";
import { MailConfiguration } from "./messages/mailOptions.js";

const PORT = process.env.port || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
	console.log("Server running on port 8080");
});

app.post("/envio-mensaje", async (req, res) => {
	try {
		await transporter.sendMail(MailConfiguration);

		res.send("Mensaje enviado correctamente");
	} catch (error) {
		res.send(`Ha ocurrido un error ${error}`);
	}
});
