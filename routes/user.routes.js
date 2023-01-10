const express = require("express");
const User = require("../models/User");
const Favorite = require("../models/Favorite.model");

const { validateToken } = require("../utils/jwt");

// Este router esta ya montado en /useres en server/app.js
const router = express.Router();

// /api/users

router.get("/", (req, res) => {
  User.findAll({
    include: Favorite,
    // attributes: ["id", "fullName", "username", "lastActivity"],
  }).then((users) => {
    res.json(users);
  });
});

router.get("/:username", async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({
    where: { username },
    include: Favorite,
    // attributes: ["id", "fullName", "username", "lastActivity"],
  });

  if (!user) {
    return res.sendStatus(404);
  } else {
    res.json(user);
  }
});

router.put("/", validateToken, async (req, res) => {
  const { username } = req.payload;

  const [cant, [userUpdated]] = await User.update(req.body, {
    where: { username },
    returning: true,
    fields: ["fullName", "username", "password"],
  });

  if (cant === 0) {
    return res.sendStatus(404);
  }

  res.send(userUpdated);
});

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      const createdUser = await User.create(req.body, {
        // fields: ["fullName", "username", "password"],
      });
      const token = generateToken({ userId: createdUser.id, username: createdUser.username });

      res.status(201).json({...createdUser, token });
    } else res.status(404).json({ msg: "username exists" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "server error" });
  }
});

module.exports = router;
