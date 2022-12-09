// server configs

const express = require("express");
const db = require("./config/db");
const variables = require("./config/variables");
// const User = require("./models/User");

const models = require("./models");

const router = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

db.sync({ force: false })
  .then(() => {
    console.log("db online");
    app.listen(variables.PORT, () => {
      console.log(`server on port ${variables.PORT}`);
    });
  })
  .catch(console.error);
