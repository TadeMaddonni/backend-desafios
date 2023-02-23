import express from "express";
import { UserController } from "../../controllers/user.controller.js";

const router = express.Router();

router.get("/", UserController.getUsers);
router.post("/", UserController.saveUser);

export { router as userRouter };