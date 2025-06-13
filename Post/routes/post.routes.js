const express = require("express");
const { authorizeUser } = require("../../User/src/auth/user.authorize");
const { allPost } = require("../controller/post.controller");
const postRouter = express.Router();

postRouter.get("/", authorizeUser, allPost);
postRouter.post("/", authorizeUser, savePost);
postRouter.put("/:postId", authorizeUser, updatePost);
postRouter.delete("/:postId", authorizeUser, deletePost);

module.exports = postRouter;
