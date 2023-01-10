const express = require("express");
const User = require("../models/User");
const axios = require("axios");
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

router.post("/google-login", async (req, response) => {
  const { googleToken } = req.body;
  const url = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCGNClHoWgh5hd0W9QEQtSxhjS3lortFzs";
  try {
    const res = await axios.post(url, {
      idToken: googleToken,
    });
    const googleUser = res.data.users[0];
    let user = await User.findOne({ where: { googleId: googleUser.localId } });
    if (!user) {
      user = await User.create({ googleId: googleUser.localId, fullName: googleUser.displayName, username: googleUser.email });
    }
    user = user.dataValues;
    const { id, username } = user;
    console.log("🤔 ~ router.post ~ user", user)
    const token = generateToken({ userId: id, username });
    response.json({ ok: true, user: { ...user, token } });

  } catch (error) {
    console.log(error);
    response.status(500).json({ ok: false, msg: "server error" });
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
