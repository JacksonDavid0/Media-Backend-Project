const express = require("express");
const userRouter = express.Router();
const {
  registerUser,
  verifyUser,
  loginUser,
  logoutUser,
  userProfile,
  updateProfile,
  uploadPicture,
  forgettenPassword,
} = require("../controller/user.controller");
const { authenticateUser } = require("../auth/user.authenticate");
const { authUser } = require("../auth/authorizeUser");
const { authorizeUser } = require("../auth/user.authorize");
const upload = require("../middleware/upload");

userRouter.post("/register", authenticateUser, registerUser);
userRouter.get("/verifyUser/signature=:userId&:token", verifyUser);
userRouter.post("/login", authUser, loginUser);
userRouter.get("/profile/:username", authorizeUser, userProfile);
userRouter.put("/profile/update", authorizeUser, updateProfile);
userRouter.post("/profile/upload", authorizeUser, upload, uploadPicture);
userRouter.post("forget-Password", forgettenPassword);
userRouter.get("corfirmPasswordToken/:token", confirmPasswordToken);
userRouter.post("/resetPassword", resetPassword);
userRouter.get("/logout", logoutUser);

module.exports = userRouter;
