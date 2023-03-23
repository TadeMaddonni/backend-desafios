class loginController {
	static renderLogin(req, res) {
		res.render("login");
	}

	static login(req, res) {
		const { email } = req.body;
		req.session.username = email;
		res.redirect("/");
	}

	static logout(req, res) {
		const name = req.session.username;

		req.session.destroy((err) => {
			if (err) return res.redirect("/");
			res.render("logout", { name: name });
		});
	}
}

export { loginController };
