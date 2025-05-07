const handleError = require("../middleware/errorHandler");
const User = require("../model/user.model");

async function authorizeUser(req, res, next) {
  const authToken = req.cookies.userToken;

  if (!authToken) {
    const error = {
      status: 401,
      code: "Authorization_Error",
      message: "Unathorized access token",
      details: [],
    };
    handleError(req, res, error);
  }

  const token = authToken;
  const userId = await User.verifyToken(token);
  if (!userId) {
    const error = {
      status: 401,
      code: "Authorization_Error",
      message: "Unathorized access token",
      details: [],
    };
    handleError(req, res, error);
  }
  req.authorizeUserId = userId;
  next();
}

module.exports = { authorizeUser };
