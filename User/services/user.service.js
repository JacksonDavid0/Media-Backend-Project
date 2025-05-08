const User = require("../model/user.model");
const _ = require("lodash");
const { scheduleUserDelete } = require("../tasks/user.agenda");
const {
  sendActivationLink,
  expiredVerificationLink,
  activatedVerificationLink,
} = require("../mail/sendmail");
const { notFoundError } = require("../middleware/errorHandler");

async function register(
  username,
  firstname,
  lastname,
  gender,
  email,
  phone,
  dob,
  address,
  password
) {
  try {
    const user = new User({
      username: username,
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      email: email,
      phone: phone,
      dob: dob,
      address: address,
      password: password,
    });
    await user.save();
    scheduleUserDelete(user._id);
    const token = await user.generateToken("24h");
    await sendActivationLink(user.username, user._id, user.email, token);
    return {
      Data: `User: ${user.username} registered successfully.`,
      Message:
        "We've sent a verification link to your email. Please activate/verify your account.",
    };
  } catch (error) {
    throw new Error(error);
  }
}

async function verify(token, userId) {
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return {
        Data: await expiredVerificationLink(),
        Message: "User verification expired",
      };
    }
    if (user.verified) {
      return {
        Data: await activatedVerificationLink(user.username),
        Message: "User already verified",
      };
    }

    const userToken = await User.verifyToken(token);
    if (!userToken) {
      return {
        Data: await expiredVerificationLink(),
        Message: "User verification expired",
      };
    }

    const updatedUser = await User.findByIdAndUpdate(userId, {
      verified: true,
    });

    return {
      Data: await activatedVerificationLink(updatedUser.username),
      Message: "User verified successfully.",
    };
  } catch (error) {
    throw new Error(error);
  }
}

async function login(email) {
  try {
    const user = await User.findOne({ email });
    const token = await user.generateToken("7d");
    return {
      Data: _.omit(user.toObject(), ["_id", "password", "__v"]),
      Token: token,
      Message: "User logged in successfully.",
    };
  } catch (error) {
    throw new Error(error);
  }
}

async function getUserProfile(username, userId) {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return notFoundError();
    }

    if (user._id.toString() !== userId) {
      return {
        Data: _.omit(user.toObject(), [
          "_id",
          "email",
          "password",
          "role",
          "verified",
          "createdAt",
          "__v",
        ]),
        Message: "User profile retrieved successfully.",
      };
    } else if (user._id.toString() === userId.toString()) {
      return {
        Data: _.omit(user.toObject(), [
          "_id",
          "password",
          "role",
          "verified",
          "createdAt",
          "__v",
        ]),
        Message: "User profile retrieved successfully.",
      };
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function updateUserProfile(
  userId,
  username,
  firstname,
  lastname,
  gender,
  email,
  phone,
  dob,
  address
) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          username,
          firstname,
          lastname,
          gender,
          email,
          phone,
          dob,
          address,
        },
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return notFoundError();
    }

    return {
      Data: _.omit(user.toObject(), [
        "_id",
        "password",
        "role",
        "verified",
        "createdAt",
        "__v",
      ]),
      Message: "User profile updated successfully.",
    };
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  register,
  verify,
  login,
  getUserProfile,
  updateUserProfile,
};
