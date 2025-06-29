const { handleError } = require("../../../errorHandler");
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
    return handleError(req, res, error);
  }

  const userId = await User.verifyToken(authToken);
  if (!userId) {
    const error = {
      status: 401,
      code: "INVALID_OR_EXPIRED_TOKEN",
      message: "The provided authentication token is invalid or expired.",
      details: [{ message: "Please log in again to obtain a new token." }],
    };
    return handleError(req, res, error);
  }

  const user = await User.verifyUser(userId);
  if (!user) {
    const error = {
      status: 404,
      code: "USER_NOT_FOUND",
      message: "The requested user could not be found.",
    };
    return handleError(req, res, error);
  }
  req.authorizeUserId = userId;
  next();
}

module.exports = { authorizeUser };
