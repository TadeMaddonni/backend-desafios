import { logger } from "../logger/logger.js";
import { getNumbers } from "../utils/getRandomNumbers.js";

class apiController {
	static async getRandomNumbers(req, res) {
		const randomNumbersCant = parseInt(req.query.cant);

		if (randomNumbersCant) {
			logger.info("Calculando numeros..");
			const numbers = await getNumbers(randomNumbersCant);
			console.log(numbers);
			res.render("numbers", {
				numbers: JSON.stringify(numbers, null, 2),
			});
		} else {
			logger.error("Numero no valido");
			res.render("numbers", {
				numbers: "No has ingresado un numero válido",
			});
		}
	}
}
export { apiController };
