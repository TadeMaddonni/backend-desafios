import nodemailer from "nodemailer";
import { config } from "../config/envConfig.js";

const transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	auth: {
		user: config.MAILER_USER,
		pass: config.MAILER_PASSWORD,
	},

	// Configuraciones de seguridad del correo
	secure: false,
	tls: {
		rejectUnauthorized: false,
	},
});

export { transporter };
