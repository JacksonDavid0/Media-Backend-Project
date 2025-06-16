const validator = require("validator");
const mongoose = require("mongoose");
const { dateNow } = require("../../errorHandler");
const { string } = require("joi");
require("dotenv").config();

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User ID is required"],
  },
  author: {
    type: String,
    required: [true, "Author is required"],
  },
  authorImage: {
    type: {
      _id: Boolean,
      filename: String,
      fileUrl: String,
      uploadAt: {
        type: Date,
      },
    },
    default: {},
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    trim: true,
    minLength: [2, "Content must be at least 2 characters"],
  },
  image: {
    type: {
      _id: Boolean,
      filename: String,
      fileUrl: String,
      uploadAt: {
        type: Date,
      },
    },
    default: {},
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: string,
    default: dateNow(),
  },
  updatedAt: {
    type: string,
    default: dateNow(),
  },
});

postSchema.pre("save", function (next) {
  this.updatedAt = dateNow();
  this.content =
    this.content.slice(0, 1).toUpperCase() +
    this.content.slice(1).toLowerCase();
  next();
});

postSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: dateNow() });
  if (this.content) {
    this.content =
      this.content.slice(0, 1).toUpperCase() +
      this.content.slice(1).toLowerCase();
  }
  next();
});

const Post = mongoose.model("Post", postSchema, "postsList");

module.exports = Post;
