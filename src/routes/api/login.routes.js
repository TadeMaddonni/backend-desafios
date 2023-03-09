import express from "express";
import { userModel } from "../../DB/models/UserModels.js";
import { Strategy as LocalStrategy, Strategy } from "passport-local";
import flash from "connect-flash";
import { comparePasswords } from "../../utils/passwordEncrypt.js";
import { logger } from "../../logger/logger.js";
import { loginController } from "../../controllers/login.controller.js";
import passport from "passport";

passport.use(
	"loginStrategy",
	new LocalStrategy(
		{
			passReqToCallback: true,
			usernameField: "email",
			passwordField: "password",
		},
		async (req, username, password, done) => {
			//Buscar el usuario dentro de la base de datos
			const user = await userModel.findOne({ email: username });

			if (!user) {
				return done(null, false);
			}
			if (user) {
				const userPassword = user.password;
				const userEmail = user.email;

				const passwordsMatch = comparePasswords(password, userPassword);
				if (passwordsMatch) {
					return done(null, user);
				} else {
					logger.error("Credenciales de login no validas");
					done(null, false);
				}
			}
		}
	)
);

const router = express.Router();

router.get("/", loginController.renderLogin);

router.post(
	"/",
	passport.authenticate("loginStrategy", {
		failureRedirect: "/login",
		failureMessage: true,
	}),
	loginController.login
);

router.get("/logout", loginController.logout);

export { router as loginRouter };
