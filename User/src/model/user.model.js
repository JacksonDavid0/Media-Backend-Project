const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const validator = require("validator");
const { dateNow } = require("../../../errorHandler");
require("dotenv").config();
const secret = process.env.JWT_Secret;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Username is require"],
    minLength: [3, "Username must be at least 3 characters"],
    maxLength: [30, "Username must be at most 30 characters"],
    validate: {
      validator: (value) => /^[a-zA-Z0-9_]+$/.test(value),
      message: "Username must only contain letters, numbers and underscores",
    },
  },

  firstname: {
    type: String,
    trim: true,
    minLength: [3, "firstname must be at least 3 characters"],
    maxLength: [30, "firstname must be at most 30 characters"],
    validate: {
      validator: (value) => /^[a-zA-Z]+$/.test(value),
      message: "firstname must only contain letters",
    },
  },

  lastname: {
    type: String,
    trim: true,
    minLength: [3, "lastname must be at least 3 characters"],
    maxLength: [30, "lastname must be at most 30 characters"],
    validate: {
      validator: (value) => /^[a-zA-Z]+$/.test(value),
      message: "lastname must only contain letters",
    },
  },

  gender: {
    type: String,
    trim: true,
    default: "",
    lowercase: true,
    enum: ["male", "female", "other", ""],
    validate: {
      validator: (value) => ["male", "female", "other", ""].includes(value),
      message: "Invalid gender",
    },
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Invalid email address",
    },
  },

  phone: {
    type: String,
    trim: true,
    default: "",
    validate: {
      validator: (value) => value === "" || validator.isMobilePhone(value),
      message: "Invalid phone number",
    },
  },

  dob: {
    type: Date,
    trim: true,
    default: "",
    validate: {
      validator: (value) => !value || !isNaN(Date.parse(value)),
      message: "Invalid date of birth",
    },
  },

  address: {
    type: String,
    trim: true,
    default: "",
    maxLength: [100, "Address must be at most 100 characters"],
  },

  picture: {
    type: {
      _id: Boolean,
      filename: String,
      fileUrl: {
        type: String,
        validate: {
          validator: (value) => !value || validator.isURL(value),
          message: "Invalid picture URL",
        },
      },
      uploadAt: {
        type: Date,
      },
    },
    default: {},
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    min: 8,
  },

  verified: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: String,
    default: dateNow(),
  },
});

userSchema.methods.generateToken = function (exp) {
  const token = jwt.sign({ id: this._id }, secret, {
    expiresIn: exp,
  });
  return token;
};

userSchema.statics.verifyToken = async function (token) {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded.id;
  } catch (err) {
    // console.log(err);
    throw new Error("Invalid Token");
  }
};

userSchema.statics.verifyUser = async function (userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};

userSchema.pre("save", async function (next) {
  this.createdAt = dateNow();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre("findOneAndUpdate", async (next) => {
  if (this.firstname && this.lastname) {
    const firstname =
      this.firstname.slice(0, 1).toUpperCase() +
      this.firstname.slice(1).toLowerCase();
    const lastname =
      this.lastname.slice(0, 1).toUpperCase() +
      this.lastname.slice(1).toLowerCase();
    this.firstname = firstname;
    this.lastname = lastname;
  }
  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  if (this.picture) {
    this.picture.uploadAt = dateNow();
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

const User = mongoose.model("User", userSchema, "usersList");

module.exports = User;
