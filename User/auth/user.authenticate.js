const User = require("../model/user.model");

async function authenticateUser(req, res, next) {
  const { username, email } = req.body;

  try {
    // Check if the username or email already exists in the database
    console.log("checking user");
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUser) {
      const error = {
        status: 409,
        code: "CONFLICT",
        message: "User already exists",
      };
      return handleError(req, res, error);
    }

    if (existingEmail) {
      const error = {
        status: 409,
        code: "CONFLICT",
        message: "Email already exists",
      };
      return handleError(req, res, error);
    }

    next(); // If no conflicts, proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error checking user:", error);
    return handleError(req, res, error);
  }
}

module.exports = {
  authenticateUser,
};
