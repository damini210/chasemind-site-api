const User = require("../models/user");
const { generateToken } = require("../utils/jwt");
const responseHandler = require("../utils/responseHandler");

exports.register = async (req, res) => {
  try {
    const { name, email, pwd } = req.body;
    const user = new User({ name, email, pwd });
    await user.save();
    const token = generateToken(user);
    responseHandler.successResponse(res, "UserRegistrationSuccess", {
      user,
      token,
    });
    response.send(res);
  } catch (error) {
    if (error.name === "ValidationError") {
      return responseHandler.errorResponse(res, "InvalidEmail", error.message);
    }
    if (error.code === 11000) {
      return responseHandler.errorResponse(
        res,
        "EmailAlreadyExist",
        "Email already exists"
      );
    }
    responseHandler.errorResponse(res, "InternalServerError", error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, pwd } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(pwd))) {
      return responseHandler.errorResponse(res, "InvalidCredential");
    }
    const token = generateToken(user);
    responseHandler.successResponse(res, "LoginSuccess", { user, token });
  } catch (error) {
    responseHandler.errorResponse(res, "InternalServerError", error);
  }
};
