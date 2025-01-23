const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token is required" });
  }
  try {
    const token = auth.split(" ")[1];
    if (!token) {
      return res
        .status(403)
        .json({ message: "Unauthorized, JWT token is missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token is invalid or expired" });
  }
};

module.exports = ensureAuthenticated;
