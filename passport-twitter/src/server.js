//importaciones
import express from "express";
import session from "express-session";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import passport from "passport";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { Strategy as LocalStrategy, Strategy } from "passport-local";
import { userModel } from "./models/users.js";

const URLDB =
	"mongodb+srv://tade:tade1506@coderbase.1m86azc.mongodb.net/coderDB?retryWrites=true&w=majority";
mongoose.connect(
	URLDB,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(error) => {
		if (error) console.log("Conexion fallida");
		console.log("base de datos conectada correctamente");
	}
);

//servidor express
const app = express();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

//archivos estaticos
const __dirname = dirname(fileURLToPath(import.meta.url)); //ruta server.js
app.use(express.static(__dirname + "/public")); //ruta carpeta public

//motor de plantilla
//inicializar el motor de plantillas
app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
//ruta de las vistas
app.set("views", __dirname + "/views");
//vinculacion del motor a express
app.set("view engine", ".hbs");

//interpretacion de formato json desde el cliente
app.use(express.json()); //lectura de json desde el cuerpo de la peticion.
app.use(express.urlencoded({ extended: true })); //lectura de json desde un metodo post de formulario

//configuracion de la sesion
app.use(
	session({
		store: MongoStore.create({
			mongoUrl:
				"mongodb+srv://tade:tade1506@coderbase.1m86azc.mongodb.net/sessionsDB?retryWrites=true&w=majority",
		}),

		secret: "claveSecreta", //clave de encriptacion de la sesion

		//config para guardar en la memoria del servidor
		resave: true,
		saveUninitialized: true,
	})
);

//Vinculación de passport con el servidor
app.use(passport.initialize());
app.use(passport.session());

//Config serializar y deserializar (Passport no puede manejar toda la informacion de los usuarios que esten activas en nuestras sesiones. por lo que cuando un usuario se conecta. Passport toma el id de ese usuario y la informacion de ese usuario se guarda en la base de datos. y cuando preguntamos si esta activa deserealiza ese id y pregunta a la base de datos si esta activo.)

passport.serializeUser((user, done) => {
	return done(null, user.id);
});

passport.deserializeUser((id, done) => {
	// Con el ID buscamos al usuario en la base de datos, previamente serializado
	userModel.findById(id, (err, userFound) => {
		return done(err, userFound);
	});
});

//rutas asociadas a las paginas del sitio web
app.get("/", (req, res) => {
	res.render("home");
});

app.get("/registro", (req, res) => {
	res.render("signup");
});

app.get("/inicio-sesion", (req, res) => {
	res.render("login");
});

app.get("/perfil", (req, res) => {
	res.render("profile");
});

// Estrategia de registro de usuarios
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
				console.log(password);
				const newUser = {
					name: req.body.name,
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
passport.use(
	"loginTwitter",
	new TwitterStrategy(
		{
			//parametros para conectarme a la API de twitter
			consumerKey: "r3ip6le35xbLIj2tlr9YM5cGD",
			consumerSecret:
				"5cVyJNd4oupk3476qPSe2xezLExbhK8ihToQnpBr4cdNSLewCx",
			callbackURL: "http://localhost:8080/auth/twitter/callback",
		},
		(token, secretToken, profile, done) => {
			console.log("profile", profile);
			//buscar si el usuario ya existe en la base de datos
			userModel.findOne({ email: profile.username }, (err, userFound) => {
				if (err) return done(err);
				if (userFound)
					return done(null, userFound, {
						message: "El usuario ya existe",
					});
				//si no existe entonces guardamos al usuario
				const newUser = {
					name: profile.displayName,
					email: profile.username,
					password: profile.id,
				};
				userModel.create(newUser, (err, userCreated) => {
					if (err) return done(err);
					return done(null, userCreated);
				});
			});
		}
	)
);
//Rutas de Autenticación
let users = [];

//Registro de usuarios
app.post(
	"/signup",
	passport.authenticate("signupStrategy", {
		failureRedirect: "/registro",
		failureMessage: true,
	}),
	(req, res) => {
		res.redirect("/perfil");
	}
);

//Login de usuarios
app.post("/login", (req, res) => {
	/*   const { email, password } = req.body;

  const userFound = users.find((elm) => elm.email === email);
  if (userFound) {
    //Validar contraseña
    if (userFound.password === password) {
      req.session.user = req.body;
      res.redirect("/perfil");
    } else {
      res.render("login", { error: "Credenciales no validas" });
    }
  } else {
    res.render("login", { error: "Credenciales no validas" });
  } */
	// asd
});
//Login usando twitter
app.get("/auth/twitter", passport.authenticate("loginTwitter"));

app.get(
	"/auth/twitter/callback",
	passport.authenticate("loginTwitter", {
		failureRedirect: "/inicio-sesion",
		failureMessage: true,
	}),
	(req, res) => {
		res.redirect("/perfil");
	}
);
//Logout
app.get("/logout", (req, res) => {
	/*   req.session.destroy();
  setTimeout(() => {
    res.redirect("/inicio-sesion");
  }, 1000); */
	// sa
});
