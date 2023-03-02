import express from "express";
import { apiController } from "../../controllers/api.controller.js";

const router = express.Router();

router.get("/randoms", apiController.getRandomNumbers);

export { router as apiRouter };
