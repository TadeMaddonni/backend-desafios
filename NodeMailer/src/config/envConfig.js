import * as dotenv from "dotenv";

dotenv.config();

const config = {
	MAILER_PASSWORD: process.env.MAILER_PASSWORD,
	MAILER_USER: process.env.MAILER_USER,
};

export { config };
