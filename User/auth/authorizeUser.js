const { handleError } = require("../middleware/errorHandler");
const User = require("../model/user.model");
require("dotenv").config();

const secret = process.env.SECRET;

async function authUser(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      const error = {
        status: 401,
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password.",
        details: [
          { field: "email", message: "Please check your email and try again." },
          {
            field: "password",
            message: "Please check your password and try again.",
          },
        ],
      };
      handleError(req, res, error);
    }
    const match = user.comparePassword(password);

    if (!match) {
      const error = {
        status: 401,
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password.",
        details: [
          { field: "email", message: "Please check your email and try again." },
          {
            field: "password",
            message: "Please check your password and try again.",
          },
        ],
      };
      handleError(req, res, error);
    }

    if (user.verified === false) {
      const error = {
        status: 403,
        code: "ACCOUNT_NOT_VERIFIED",
        message: "Your account has not been verified.",
        details: [
          { message: "Please check your email for a verification link." },
        ],
      };
      handleError(req, res, error);
    }
    next();
  } catch (error) {
    console.error("Error verifying user:", error);
    handleError(req, res, error);
  }
}

module.exports = { authUser };
