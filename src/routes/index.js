import express from "express";
import compression from "compression";
import { productsRouter } from "./api/products.routes.js";
import { loginRouter } from "./api/login.routes.js";
import { signupRouter } from "./api/signup.routes.js";
import { clientRouter } from "./api/client.routes.js";
import { clientController } from "../controllers/client.controller.js";

const router = express.Router();

router.get("/", clientController.getHome);

router.get("/productos", clientController.getProducts);

router.get("/info", clientController.getInfo);

router.get("/infoZip", compression(), clientController.getInfo);

router.get("/suma", clientController.suma);

router.use(clientRouter);
router.use("/productos", productsRouter);
router.use("/login", loginRouter);
router.use("/signup", signupRouter);

export { router };
