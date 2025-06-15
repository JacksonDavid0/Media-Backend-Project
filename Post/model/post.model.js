const validator = require("validator");
const mongoose = require("mongoose");
require("dotenv").config();

const postSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, "Author is required"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    trim: true,
    minLength: [10, "Content must be at least 10 characters"],
  },
  image: {
    type: {
      _id: Boolean,
      filename: String,
      fileUrl: {
        type: String,
        validate: {
          validator: (value) =>
            !value || validator.isURL(value, { require_protocol: true }),
          message: "Invalid Image URL",
        },
      },
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
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

postSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  this.content =
    this.content.slice(0, 1).toUpperCase() +
    this.content.slice(1).toLowerCase();
  next();
});

postSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  if (this.content) {
    this.content =
      this.content.slice(0, 1).toUpperCase() +
      this.content.slice(1).toLowerCase();
  }
  next();
});

const Post = mongoose.model("Post", postSchema, "postsList");

module.exports = Post;
