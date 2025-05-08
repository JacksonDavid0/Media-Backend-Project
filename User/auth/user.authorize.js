const handleError = require("../middleware/errorHandler");
const User = require("../model/user.model");

async function authorizeUser(req, res, next) {
  const authToken = req.cookies.userToken;

  if (!authToken) {
    const error = {
      status: 401,
      code: "AUTH_TOKEN_REQUIRED",
      message: "Authentication token is missing or invalid.",
      details: [{ message: "Please log in to obtain a valid token." }],
    };
    handleError(req, res, error);
  }

  const token = authToken;
  const userId = await User.verifyToken(token);
  if (!userId) {
    const error = {
      status: 401,
      code: "INVALID_OR_EXPIRED_TOKEN",
      message: "The provided authentication token is invalid or expired.",
      details: [{ message: "Please log in again to obtain a new token." }],
    };
    handleError(req, res, error);
  }
  req.authorizeUserId = userId;
  next();
}

module.exports = { authorizeUser };
