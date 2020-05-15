import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
//import Pool from "pg";
import "./controllers/LoginController";
import { AppRouter } from "./AppRouter";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

//const pool = new (Pool as any)({
//  user: "ivanrl",
//  password: "73442332",
//  database: "gameStats",
//});

app.use(cors(corsOptions));
app.use(express.json());

app.use(
  session({
    //store: new (connectPgSimple(session))({
    //pool,
    //}),
    secret: "cats",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "none",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(AppRouter.getInstance());

app.listen(5000, () => {
  console.log("started");
});

export default app;
