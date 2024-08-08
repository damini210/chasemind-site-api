const responseMessages = require("../utils/responseMessages");

exports.successResponse = (res, messageKey, data = {}) => {
  const messageConfig = responseMessages[messageKey];
  if (!messageConfig) {
    return res
      .status(500)
      .json({ meta: { code: 1001, message: "Undefined response message" } });
  }
  return res
    .status(200)
    .json({
      meta: { code: messageConfig.code, message: messageConfig.message}, data,
    });
};

exports.errorResponse = (res, messageKey, errorDetails = {}) => {
  const messageConfig = responseMessages[messageKey];
  if (!messageConfig) {
    return res
      .status(500)
      .json({ meta: { code: 1001, message: "Undefined response message" } });
  }
  return res.status(400).json({
    meta: {
      code: messageConfig.code,
      message: messageConfig.message,
      errorDetails,
    },
  });
};
