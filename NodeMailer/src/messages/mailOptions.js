import { config } from "../config/envConfig.js";
import { htmlTemplate } from "./emailTemplate.js";

const MailConfiguration = {
	from: "Server app Node",
	to: config.MAILER_USER, //Destinatario
	subject: "Email de prueba desde node",
	html: htmlTemplate,
};

export { MailConfiguration };
