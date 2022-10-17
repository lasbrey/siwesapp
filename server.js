//Import modules
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app = express();
const db = require("./config/db");

// Load env variables
dotenv.config({ path: "./config/.env" });

// Connect to database
db();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

// Register Partials
hbs.registerPartials(__dirname + "/views/partials");

// Register helpers
hbs.registerHelper("ifEquals", function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

//Set view Engine
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));

app.use(cors()); // Enabled CORS

// Define Routes
app.use("/", require("./routes/routes"));

//404 hander
app.use((req, res, next) => {
  res.status(404).render("404", {
    user:req.user,
  });
});

//Configure Port
app.listen(port, () => {
  console.log(` ✬ connected to database successfully `);
});
