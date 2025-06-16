const express = require("express");
const { authorizeUser } = require("../../User/src/auth/user.authorize");
const {
  allPost,
  savePost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  userPost,
} = require("../controller/post.controller");
const postUpload = require("../middleware/post.upload");
const postRouter = express.Router();

postRouter.get("/", authorizeUser, allPost);
postRouter.get("/user", authorizeUser, userPost);
postRouter.post("/save", authorizeUser, postUpload, savePost);
postRouter.get("/like/:postId", authorizeUser, likePost);
postRouter.get("/dislike/:postId", authorizeUser, dislikePost);
postRouter.put("/update/:postId", authorizeUser, updatePost);
postRouter.delete("/delete/:postId", authorizeUser, deletePost);

module.exports = postRouter;
