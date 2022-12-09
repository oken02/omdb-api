const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(payload, "SECRET", { expiresIn: "7d" });
};

const validateToken = (req, res, next) => {
  console.log("AUTHORIZATION", req.get("Authorization"));
  const [type, reqToken] = (req.get("Authorization") || "").split(" ");
  console.log("REQ TOKEN", reqToken);

  if (!reqToken) {
    return res.status(401).json({ msg: "token missing or invalid" });
  }

  jwt.verify(reqToken, "SECRET", (err, payload) => {
    if (err) {
      // console.log(err);
      return res.sendStatus(401);
    }
    req.payload = payload;
    console.log("NEXT");
    next();
  });
};

module.exports = {
  generateToken,
  validateToken,
};
