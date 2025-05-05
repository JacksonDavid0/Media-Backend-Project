const handleError = require("../middleware/errorHandler");
const { User } = require("../model/user.model");
require("dotenv").config();

const secret = process.env.SECRET;

async function authUser(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne(email);

    if (!user) {
      const error = {
        status: 401,
        code: "AUTHENTICATION_FAILED",
        message: "Invalid email or password",
        details: [],
      };
      handleError(req, res, error);
    }
    const match = user.comparePassword(password);

    if (!match) {
      const error = {
        status: 401,
        code: "AUTHENTICATION_FAILED",
        message: "Invalid email or password",
        details: [],
      };
      handleError(req, res, error);
    }

    if (user.verified === false) {
      const error = {
        status: 403,
        code: "ACCOUNT_NOT_VERIFIED",
        message:
          "Your account is not verified. Please check your email to complete verification.",
        details: [],
      };
      handleError(req, res, error);
    }
    console.log("user verified");
    next();
  } catch (error) {
    console.error("Error verifying user:", error);
    handleError(req, res, error);
  }
}

module.exports = { authUser };
