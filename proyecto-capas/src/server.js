import express from "express";
import { connectMongo } from "./config/dbConnection.js";
import { router } from "./routes/index.js";

connectMongo();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
