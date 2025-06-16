const { handleError } = require("../../errorHandler");
const { postValidator } = require("../middleware/post.validator");
const {
  getAllPost,
  updateUserPost,
  deleteUserPost,
  saveUserPost,
  likeUserPost,
  dislikeUserPost,
} = require("../services/post.service");

const allPost = async (req, res) => {
  try {
    const { Data } = await getAllPost();
    res.status(200).send(Data);
  } catch (error) {
    handleError(req, res, error);
  }
};

const userPost = async (req, res) => {
  const userId = req.authorizeUserId;
  try {
    const { Data } = await getUserPost();
    res.status(200).send(Data);
  } catch (error) {
    handleError(req, res, error);
  }
};

const savePost = async (req, res) => {
  const userId = req.authorizeUserId;
  try {
    const { content } = req.body;
    const image = {
      filename: req.file.filename,
      fileUrl: `/postUploads/${req.file.filename}`,
    };

    // await postValidator(content);
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
const dislikePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await dislikeUserPost(postId);
    res.status(200).send(post.Data);
  } catch (error) {
    handleError(req, res, error);
  }
};

const updatePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const { content } = req.body;
    const image = {
      filename: req.file.image,
      fileUrl: `/uploads/${req.file.filename}`,
    };
    // postValidator({ content });
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

module.exports = {
  allPost,
  userPost,
  savePost,
  likePost,
  dislikePost,
  updatePost,
  deletePost,
};
