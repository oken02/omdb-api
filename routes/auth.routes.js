const express = require("express");
const User = require("../models/User");
const { generateToken, validateToken } = require("../utils/jwt");

// Este router esta ya montado en /useres en server/app.js
const router = express.Router();

// /api/auth

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username, password } });

    if (user) {
      const { id, username } = user;
      const token = generateToken({ userId: id, username });
      res.json({ ok: true, msg: "login success!", token, user });
    } else res.status(404).json({ msg: "user no exists" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "server error" });
  }
});

router.post("/validate", validateToken, (req, res) => {
  const { userId } = req.payload;

  User.findByPk(userId).then((user) => {
    user.getFavorites().then((favorites) => {
      // user.jnjjn = favorites;
      res.json({
        ok: true,
        msg: "valid token",
        user: user.toJSON(),
      });
    });
  });
});

module.exports = router;
