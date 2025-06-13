const User = require("../../User/src/model/user.model");
const Post = require("../model/post.model");
const _ = require("lodash");

const getAllPost = async () => {
  try {
    const posts = await Post.find();
    return {
      Data: _.omit(posts.toObject(), ["__v", "updatedAt"]),
      Message: "Successfully fetched posts ",
    };
  } catch (error) {
    throw new Error(error);
  }
};

const addPost = async (userId, content, image) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const author = `${user.firstName} ${user.lastName}`;
    const post = new Post(author, content, image);
    await post.save();
    return {
      Data: _.omit(posts.toObject(), ["__v", "updatedAt"]),
      Message: "Post added successfully",
    };
  } catch (error) {}
};

const likePost = async (postId) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: postId },
      { $inc: { likes: 1 } },
      {
        runValidators: true,
        new: true,
      }
    );
    if (!post) {
      throw new Error("Post not found");
    }
    post.likes += 1;
    await post.save();
    return {};
  } catch (error) {
    throw new Error(error);
  }
};

const updateUserPost = async (postId, content, image) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: postId },

      {
        $set: {
          content,
          image,
        },
      },
      {
        runValidators: true,
        new: true,
      }
    );

    if (!post) {
      throw new Error("Post not found");
    }
    return {
      Data: _.omit(post.toObject(), ["__v", "updatedAt"]),
      Message: "Post updated successfully",
    };
  } catch (error) {
    throw new Error(error);
  }
};

const deleteUserPost = async (postId) => {
  try {
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      throw new Error("Post not found");
    }

    return {
      Message: "Post deleted successfully",
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllPost,
  addPost,
  updateUserPost,
  likePost,
  deleteUserPost,
};
