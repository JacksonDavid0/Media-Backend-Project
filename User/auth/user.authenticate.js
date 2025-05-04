const User = require("../model/user.model");

async function authenticateUser(req, res, next) {
  const { username, email } = req.body;

  try {
    // Check if the username or email already exists in the database
    console.log("checking user");
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Registration Error",
        detail: "Username already exists",
      }); // 409 Conflict
    }

    if (existingEmail) {
      return res.status(409).json({
        message: "Registration Error",
        detail: "Email already exists",
      }); // 409 Conflict
    }

    next(); // If no conflicts, proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error checking user:", error);
    return res
      .status(500)
      .json({ message: "Registration Error", detail: "Internal Server Error" }); // 500 Internal Server Error
  }
}

module.exports = {
  authenticateUser,
};
