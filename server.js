const express = require("express");
const db = require("./config/db");
// const User = require("./models/User");
const models = require("./models");
const router = require("./routes");
const cors = require("cors")

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", router);

db.sync({ force: false })
  .then(() => {
    console.log("db online");
    app.listen(process.env.PORT, () => {
      console.log(`server on port ${process.env.PORT}`);
    });
  })
  .catch(console.error);
