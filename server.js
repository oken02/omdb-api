// server configs

const express = require("express");
const db = require("./config/db");
// const User = require("./models/User");

const models = require("./models");

const router = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

db.sync({ force: false })
  .then(() => {
    console.log("DB ONLINE");
    app.listen(4000, () => {
      console.log("server on port 3009");
    });
  })
  .catch(console.error);