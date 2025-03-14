require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const path = require("path");
const dbConnectMongo = require("./src/config/mongo");
const { dbConnectSQL } = require("./src/config/mysql");
const passport = require("passport");
const session = require("express-session");
const ENGINE_DB = process.env.ENGINE_DB;

const port = process.env.PORT || 3000;
app.use(express.json());

app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(morgan("dev"));

app.use("/", require("./src/routes"));

app.use("/public", express.static(path.join(__dirname, "src/storage")));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

ENGINE_DB === "nosql" ? dbConnectMongo() : dbConnectSQL();
