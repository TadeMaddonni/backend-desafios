import * as dotenv from "dotenv";

dotenv.config(); //Asignar las variables de entorno (Archivo .env) Y las guarda en nuestro proceso

export const envConfig = {
	MODE: process.env.MODE || "dev",
	DATABASE_URL: process.env.DATABASE_URL || "no existe",
	PORT: process.env.PORT || 2922,
};
