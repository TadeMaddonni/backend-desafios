import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy, Strategy } from "passport-local";
import { signupController } from "../../controllers/signup.controller.js";
import { logger } from "../../logger/logger.js";
import { userModel } from "../../DB/models/UserModels.js";
import { encryptPassword } from "../../utils/passwordEncrypt.js";
import { UserService } from "../../services/user.services.js";
const router = express.Router();

passport.use(
	"signupStrategy",
	new LocalStrategy(
		{
			passReqToCallback: true,
			usernameField: "email",
		},
		async (req, username, password, done) => {
			//Buscar el usuario dentro de la base de datos
			const user = await userModel.findOne({ email: username });
			if (user) {
				logger.error("Usuario ya existente");
				return done(null, false);
			}
			const newUser = {
				email: username,
				password: encryptPassword(password),
			};
			const userCreated = await UserService.saveUser(newUser);
			if (userCreated) {
				return done(null, userCreated);
			} else {
				logger.error("Ha ocurrido un error durante el registro");
				return done(null, false);
			}
		}
	)
);

router.get("/", signupController.renderSignup);

router.post(
	"/",
	passport.authenticate("signupStrategy", {
		failureRedirect: "/signup",
		failureMessage: true,
	}),
	signupController.redirectLogin
);

export { router as signupRouter };
