const jwt = require("jsonwebtoken");
const CONFIG = require("../config/config");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, CONFIG.jwtSecret, {
    expiresIn: CONFIG.JWT_EXPIRES_IN,
  });
};

module.exports = { generateToken };
