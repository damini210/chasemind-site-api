const jwt = require("jsonwebtoken");
const responseHandler = require("../utils/responseHandler");
const CONFIG = require("../config/config");

const authMiddleware = (req, res, next) => {
  const authorizationHeader = req.header("Authorization");

  if (!authorizationHeader) {
    return responseHandler.errorResponse(
      res,
      "Unauthorized",
      "Access denied. No token provided."
    );
  }
  const token = authorizationHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, CONFIG.jwtSecret);
    req.user = decoded;
    next();
  } catch (ex) {
    responseHandler.errorResponse(res, "Unauthorized", "Invalid token.");
  }
};

module.exports = authMiddleware;
