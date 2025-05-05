const express = require("express");
const userRouter = express.Router();
const {
  registerUser,
  verifyUser,
  loginUser,
  logoutUser,
} = require("../controller/user.controller");
const { authenticateUser } = require("../auth/user.authenticate");
const { authUser } = require("../auth/user.authorize");

userRouter.post("/register", authenticateUser, registerUser);
userRouter.get("/verifyUser/signature=:userId&:token", verifyUser);
userRouter.post("/login", authUser, loginUser);
userRouter.get("/logout", logoutUser);

module.exports = userRouter;
