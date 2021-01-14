const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("../routes/index.js");
const cors = require("cors");
//--------- auth
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;

const { User } = require("./db.js"); //get user from db

const server = express();

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(express.static("public"));
server.use(
    session({
        secret: "secret",
        resave: false,
        saveUnitialized: true,
    })
);
server.use(morgan("dev"));
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        (email, password, done) => {
            User.findOne({ where: { email: email } })
                .then((usuario) => {
                    if (!usuario || !usuario.correctPassword(password)) {
                        return done(null, false, {
                            message: "Incorrect email or password.",
                        });
                    }
                    return done(null, usuario);
                })
                .catch((err) => done(err));
        }
    )
);

passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
});

passport.deserializeUser(function (id, done) {
    User.findByPk(id)
        .then((usuario) => {
            done(null, usuario);
        })
        .catch((err) => done(err, null));
});

//------Passport Sesion
server.use(passport.initialize());
server.use(passport.session());

server.use(cors());
server.use("/", routes);


module.exports = server;
