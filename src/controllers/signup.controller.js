class signupController {
	static renderSignup(req, res) {
		res.render("signup");
	}

	static redirectLogin(req, res) {
		res.redirect("/login/");
	}
}

export { signupController };
