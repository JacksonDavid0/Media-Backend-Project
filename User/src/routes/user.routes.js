const express = require("express");
const userRouter = express.Router();
const {
  registerUser,
  verifyUser,
  loginUser,
  logoutUser,
  userProfile,
  updateProfile,
  forgettenPassword,
  resetForgettenPassword,
  confirmForgettenPasswordToken,
  veiwUserProfile,
} = require("../controller/user.controller");
const { authenticateUser } = require("../auth/user.authenticate");
const { authUser } = require("../auth/authorizeUser");
const { authorizeUser } = require("../auth/user.authorize");
const userUpload = require("../middleware/user.upload");

userRouter.post("/register", authenticateUser, registerUser);
userRouter.post("/login", authUser, loginUser);
userRouter.get("/profile", authorizeUser, userProfile);
userRouter.get("/profile/:id", authorizeUser, veiwUserProfile);
// userRouter.get("/profile/upload", userUpload, authorizeUser, uploadPicture);
userRouter.put("/profile/update", userUpload, authorizeUser, updateProfile);
userRouter.post("/forget-Password", forgettenPassword);
userRouter.get("/verifyUser/signature=:userId&:token", verifyUser);
userRouter.get(
  "/corfirmPasswordToken/signature=:userId&:token",
  confirmForgettenPasswordToken
);
userRouter.post("/resetPassword", resetForgettenPassword);
userRouter.get("/logout", logoutUser);

module.exports = userRouter;
