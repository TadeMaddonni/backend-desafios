import express from "express";
import { productContainer } from "../server.js";
import { fork } from "child_process";
import { getNumbers } from "../utils/getRandomNumbers.js";
import { logger } from "../logger/logger.js";

const randomRouter = express.Router();

randomRouter.get("/randoms", async (req, res) => {
	const randomNumbersCant = parseInt(req.query.cant);

	if (randomNumbersCant) {
		logger.info("Calculando numeros..");
		const numbers = await getNumbers(randomNumbersCant);
		console.log(numbers);
		res.render("numbers", { numbers: JSON.stringify(numbers, null, 2) });

		/* 		//Creamos el proceso hijo
		const child = fork("./src/routes/process/childRandomProcess.js");
		child.on("message", (childMsg) => {
			//Proceso hijo listo para funcionar
			if (childMsg === "ready") {
				child.send({ message: "start", qty: randomNumbersCant });
			} else {
				res.send(
					` Los numeros aleatorios son ${JSON.stringify(
						childMsg.result
					)}`
				);
			}
		}); */
	} else {
		logger.error("Numero no valido");
		res.render("numbers", { numbers: "No has ingresado un numero válido" });
		/* 		//Creamos el proceso hijo
		const child = fork("./src/routes/process/childRandomProcess.js");
		child.on("message", (childMsg) => {
			//Proceso hijo listo para funcionar
			if (childMsg === "ready") {
				child.send({ message: "start", qty: 50000000 });
			} else {
				res.render("numbers", {
					numbers: JSON.stringify(childMsg.result, null, 2),
				});
			}
		}); */
	}
});

export { randomRouter };
