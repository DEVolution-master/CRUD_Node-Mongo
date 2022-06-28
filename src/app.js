const path = require("path");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

// CONNECTING TO DB
mongoose
  .connect("mongodb://localhost/crud-mongo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("Db connected"))
  .catch((err) => console.log(err));

// IMPORTING ROUTES
const indexRoutes = require("./routes/index");

// SETTINGS. Definimos un puerto
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use("/", indexRoutes);

// STARTING SERVER
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
