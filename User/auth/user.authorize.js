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
  }

  const token = authToken;
  const userId = User.verifyToken(token);
  req.authorizeUserId = userId;
  next();
}

module.exports = { authorizeUser };
