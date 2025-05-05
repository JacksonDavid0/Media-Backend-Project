const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const validator = require("validator");
// require("dotenv").config();
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
    required: [true, "firstname is require"],
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
    required: [true, "Lastname is require"],
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
    required: [true, "Gender is required"],
    enum: ["male", "female", "other", ""],
    validate: {
      validator: (value) => ["male", "female", "other"].includes(value),
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
    type: String,
    trim: true,
    default: "",
    validate: {
      validator: (value) =>
        !value || validator.isURL(value, { require_protocol: true }),
      message: "Invalid picture URL",
    },
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
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateToken = function (exp) {
  console.log(secret);

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
    console.log(err);
    throw new Error("Invalid Token");
  }
};

userSchema.pre("save", async function name(params) {
  const firstname =
    this.firstname.toString().slice(0, 1).toUppercase() +
    this.firstname.toString().slice(1).toLowercase();
  const lastname =
    this.lastname.toString().slice(0, 1).toUppercase() +
    this.lastname.toString().slice(1).toLowercase();
  this.firstname = firstname;
  this.lastname = lastname;
  console.log("before hash password");
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log(this.password);
  next();
});

userSchema.pre("findOneAndUpdate", async (next) => {
  if (this.firstname && this.lastname) {
    const firstname =
      this.firstname.toString().slice(0, 1).toUppercase() +
      this.firstname.toString().slice(1).toLowercase();
    const lastname =
      this.lastname.toString().slice(0, 1).toUppercase() +
      this.lastname.toString().slice(1).toLowercase();
    this.firstname = firstname;
    this.lastname = lastname;
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

const User = mongoose.model("User", userSchema, "usersList");

module.exports = User;
