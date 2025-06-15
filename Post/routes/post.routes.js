const express = require("express");
const { authorizeUser } = require("../../User/src/auth/user.authorize");
const {
  allPost,
  savePost,
  updatePost,
  deletePost,
  likePost,
} = require("../controller/post.controller");
const postUpload = require("../middleware/post.uplaod");
const postRouter = express.Router();

postRouter.get("/", authorizeUser, allPost);
postRouter.post("/save", authorizeUser, postUpload, savePost);
postRouter.post("/like/:postId", authorizeUser, likePost);
postRouter.put("/:postId", authorizeUser, updatePost);
postRouter.delete("/:postId", authorizeUser, deletePost);

module.exports = postRouter;
