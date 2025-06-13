const { handleError } = require("../../User/src/middleware/errorHandler");
const {
  getAllPost,
  updateUserPost,
  deleteUserPost,
  saveUserPost,
  likeUserPost,
} = require("../services/post.service");

const allPost = async (req, res) => {
  try {
    const post = await getAllPost();
    res.status(200).send(post.Data);
  } catch (error) {
    handleError(req, res, error);
  }
};

const savePost = async (req, res) => {
  const userId = req.authorizeUserId;
  const { content, image } = req.body;
  try {
    const post = await saveUserPost(userId, content, image);
    res.status(201).send(post.Data);
  } catch (error) {
    handleError(req, res, error);
  }
};

const likePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await likeUserPost(postId);
    res.status(200).send(post.Data);
  } catch (error) {
    handleError(req, res, error);
  }
};

const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { content, image } = req.body;
  try {
    const post = await updateUserPost(postId, content, image);
    res.status(200).send(post.Data);
  } catch (error) {
    handleError(req, res, error);
  }
};

const deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await deleteUserPost(postId);
    res.status(200).send(post.Message);
  } catch (error) {
    handleError(req, res, error);
  }
};

module.exports = { allPost, savePost, likePost, updatePost, deletePost };
