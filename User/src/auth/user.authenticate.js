const { handleError } = require("../../../errorHandler");
const User = require("../model/user.model");

async function authenticateUser(req, res, next) {
  const { username, email } = req.body;

  if (username || email)
    try {
      if (!username || !email) {
        const error = {
          status: 400,
          code: "MISSING_REQUIRED_FIELDS",
          message: "Username and email are required fields.",
          details: [],
        };
        if (!username)
          error.details.push({
            field: "username",
            message: "Username is required.",
          });
        if (!email)
          error.details.push({ field: "email", message: "Email is required." });

        return handleError(req, res, error);
      }
      // Check if the user already exists
      const existingUser = await User.findOne({ username });
      const existingEmail = await User.findOne({ email });

      if (existingUser) {
        const error = {
          status: 409,
          code: "USER_ALREADY_EXISTS",
          message: "A user with the provided credentials already exists.",
          details: [
            { field: "username", message: "This username is already taken." },
          ],
        };
        return handleError(req, res, error);
      }

      if (existingEmail) {
        const error = {
          status: 409,
          code: "USER_ALREADY_EXISTS",
          message: "A user with the provided credentials already exists.",
          details: [
            { field: "email", message: "This email is already registered." },
          ],
        };
        return handleError(req, res, error);
      }
      console.log("yes");

      next();
    } catch (error) {
      console.error("Error checking user:", error);
      return handleError(req, res, error);
    }
  else next();
}

module.exports = {
  authenticateUser,
};
