import express from "express";
import passport from "passport";
import { userModel } from "../models/UserModels.js";
import { Strategy as LocalStrategy, Strategy } from "passport-local";

passport.use(
	"loginStrategy",
	new LocalStrategy(
		{
			passReqToCallback: true,
			usernameField: "email",
		},
		async (req, res, username, password, done) => {
			//Buscar el usuario dentro de la base de datos
			await userModel.findOne({ email: username }, (err, userFound) => {
				if (err) {
					console.log(err);
					return done(err);
				}
				if (!userFound) {
					return done(null, false, { message: "User not found" });
				}
				if (userFound) {
					const userPassword = userFound.password;
					const userEmail = userFound.email;
					if (userPassword === password && userEmail === username) {
						return done(null, userFound, {
							message: "Credenciales validas",
						});
					} else {
						done(null, false, {
							message: "Credenciales no validas",
						});
					}
				}
			});
		}
	)
);
const loginRouter = express.Router();

loginRouter.get("/login", (req, res) => {
	res.render("login");
});
/* 
loginRouter.post("/login", (req, res) => {
	const { name } = req.body;
	req.session.username = name;
	res.redirect("/");
}); */

loginRouter.post(
	"/login",
	passport.authenticate("loginStrategy", {
		failureRedirect: "/login",
		failureMessage: true,
	}),
	(req, res) => {
		const { email } = req.body;
		req.session.username = email;
		res.redirect("/");
	}
);

loginRouter.get("/logout", (req, res) => {
	console.log(req.session);
	const name = req.session.username;

	req.session.destroy((err) => {
		if (err) return res.redirect("/");
		res.render("logout", { name: name });
	});
});

export { loginRouter };
