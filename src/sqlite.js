import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, "./db/ecommerce.sqlite");
console.log(dbPath);

const sqliteOptions = {
	client: "sqlite3",
	connection: {
		filename: "./src/db/chat.sqlite",
	},
	useNullAsDefault: true,
};

export { sqliteOptions };
