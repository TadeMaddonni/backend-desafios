import express from "express";
import compression from "compression";
import os from "os";
import { productContainer } from "../../DB/managers/index.js";
import { DbConfig } from "../../config/envConfig.js";
import { logger } from "../../logger/logger.js";
import { clientController } from "../../controllers/client.controller.js";

const router = express.Router();

router.get("/", clientController.getHome);

router.get("/productos", clientController.getProducts);

router.get("/info", clientController.getInfo);

router.get("/infoZip", compression(), clientController.getInfo);

router.get("/suma", clientController.suma);

export { router as clientRouter };
