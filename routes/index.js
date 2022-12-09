const express = require("express");

const userRouter = require("./user.routes");

const authRouter = require("./auth.routes");
const favoritesRouter = require("./favorites.routes");

const router = express.Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/favorites", favoritesRouter);

module.exports = router;
