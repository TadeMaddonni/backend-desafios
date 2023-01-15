import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy, Strategy } from "passport-local";
import { userModel } from "../models/UserModels.js";

const signupRouter = express.Router();

passport.use(
	"signupStrategy",
	new LocalStrategy(
		{
			passReqToCallback: true,
			usernameField: "email",
		},
		(req, username, password, done) => {
			//Buscar el usuario dentro de la base de datos
			userModel.findOne({ email: username }, (err, userFound) => {
				if (err) {
					return done(err);
				}
				if (userFound) {
					return done(null, false, {
						message: "El usuario ya existe",
					});
				}
				const newUser = {
					email: username,
					password: password,
				};
				userModel.create(newUser, (err, userCreated) => {
					err
						? done(err, null, {
								nessage:
									"Hubo un error al registrar el usuario",
						  })
						: done(null, userCreated);
				});
			});
		}
	)
);

signupRouter.get("/signup", (req, res) => {
	res.render("signup");
});

signupRouter.post(
	"/signup",
	passport.authenticate("signupStrategy", {
		failureRedirect: "/registro",
		failureMessage: true,
	}),
	(req, res) => {
		res.redirect("/login");
	}
);

export { signupRouter };
