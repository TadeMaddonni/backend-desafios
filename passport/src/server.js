//importaciones
import express from "express";
import session from "express-session";
import handlebars from "express-handlebars";
import { dirname } from "path";
import { fileURLToPath } from "url";
import passport from "passport";
import { Strategy as LocalStrategy, Strategy } from "passport-local";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import { userModel } from "./models/users.js";

const URLDB =
  "mongodb+srv://fredy:coder@coderbackend.d0kaklh.mongodb.net/coderDB?retryWrites=true&w=majority";
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
        "mongodb+srv://fredy:coder@coderbackend.d0kaklh.mongodb.net/sessionsDB?retryWrites=true&w=majority",
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

//Config serializar y deserializar

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
          return done(null, false, { message: "El usuario ya existe" });
        }
        const newUser = {
          name: req.body.name,
          email: username,
          password: password,
        };
        userModel.create(newUser, (err, userCreated) => {
          err
            ? done(err, null, {
                nessage: "Hubo un error al registrar el usuario",
              })
            : done(null, userCreated);
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
    /*   const { name, email, password } = req.body;
  console.log(name, email, password);
  const userFound = users.find((elm) => elm.email === email);
  if (userFound) {
    res.render("signup", { error: "User already registered." });
    console.log("User existente");
  } else {
    users.push(req.body);
    req.session.user = req.body;
    res.redirect("/perfil");
  } */
    // asd

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

//Logout
app.get("/logout", (req, res) => {
  /*   req.session.destroy();
  setTimeout(() => {
    res.redirect("/inicio-sesion");
  }, 1000); */
  // sa
});
