const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(payload, "SECRET", { expiresIn: "7d" });
};

const validateToken = (req, res, next) => {

  const [type, reqToken] = (req.get("Authorization") || "").split(" ");
  if (!reqToken) {
    return res.status(401).json({ msg: "token missing or invalid" });
  }

  jwt.verify(reqToken, "SECRET", (err, payload) => {
    if (err) {
      // console.log(err);
      return res.sendStatus(401);
    }
    req.payload = payload;
    next();
  });
};


module.exports = {
  generateToken,
  validateToken,
};
