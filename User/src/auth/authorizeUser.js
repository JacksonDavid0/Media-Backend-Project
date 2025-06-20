const { handleError } = require("../../../errorHandler");
const userValidator = require("../middleware/user.validator");
const User = require("../model/user.model");
require("dotenv").config();

const secret = process.env.SECRET;

async function authUser(req, res, next) {
  const { email, password } = req.body;
  try {
    if (!email) {
      const error = {
        status: 400,
        code: "BAD_REQUEST",
        message: "Email is a required field.",
      };
      return handleError(req, res, error);
    } else if (!password) {
      const error = {
        status: 400,
        code: "BAD_REQUEST",
        message: "Password is a required field.",
      };
      return handleError(req, res, error);
    }

    await userValidator({ email, password });

    const user = await User.findOne({ email });

    if (!user) {
      const error = {
        status: 401,
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password.",
      };
      console.log("User not found");

      return handleError(req, res, error);
    }
    const match = await user.comparePassword(password);
    if (!match) {
      const error = {
        status: 401,
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password.",
      };

      return handleError(req, res, error);
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
      return handleError(req, res, error);
    }
    next();
  } catch (error) {
    console.error("Error verifying user:", error);
    handleError(req, res, error);
  }
}

module.exports = { authUser };
