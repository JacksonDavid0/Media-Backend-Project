const express = require("express");
const userRouter = express.Router();
const {
  registerUser,
  verifyUser,
  loginUser,
  logoutUser,
  profile,
  userProfile,
  updateProfile,
  uploadPicture,
  forgettenPassword,
  resetForgettenPassword,
  confirmForgettenPasswordToken,
} = require("../controller/user.controller");
const { authenticateUser } = require("../auth/user.authenticate");
const { authUser } = require("../auth/authorizeUser");
const { authorizeUser } = require("../auth/user.authorize");
const userUpload = require("../middleware/user.upload");

userRouter.post("/register", authenticateUser, registerUser);
userRouter.post("/login", authUser, loginUser);
userRouter.get("/auth", authorizeUser, profile);
userRouter.get("/profile/:username", authorizeUser, userProfile);
userRouter.put("/profile/update", authorizeUser, updateProfile);
userRouter.post("/profile/upload", authorizeUser, userUpload, uploadPicture);
userRouter.post("/forget-Password", forgettenPassword);
userRouter.get("/verifyUser/signature=:userId&:token", verifyUser);
userRouter.get(
  "/corfirmPasswordToken/signature=:userId&:token",
  confirmForgettenPasswordToken
);
userRouter.post("/resetPassword", resetForgettenPassword);
userRouter.get("/logout", logoutUser);

module.exports = userRouter;
