const User = require("../model/user.model");
const _ = require("lodash");
const { scheduleUserDelete } = require("../tasks/user.agenda");
const {
  sendActivationLink,
  expiredVerificationLink,
  activatedVerificationLink,
  sendForgotPasswordLink,
  resetForgettenPasswordLink,
  expiredForgottenPasswordLink,
  notFound,
  successForgettenPasswordLink,
} = require("../mail/sendmail");
const successPasswordLink = require("../template/successPasswordTemplate");
const { dateNow } = require("../../../errorHandler");

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
    if (error.status && error.code && error.message) {
      throw error;
    } else {
      throw new Error(error);
    }
  }
}

async function verify(userId, token) {
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
    if (error.status && error.code && error.message) {
      throw error;
    } else {
      throw new Error(error);
    }
  }
}

async function login(email) {
  try {
    const user = await User.findOne({ email });
    const token = await user.generateToken("7d");

    return {
      Data: _.omit(user.toObject(), [
        "_id",
        "password",
        "role",
        "verified",
        "createdAt",
        "__v",
      ]),
      Token: token,
      Message: "User logged in successfully.",
    };
  } catch (error) {
    if (error.status && error.code && error.message) {
      throw error;
    } else {
      throw new Error(error);
    }
  }
}

async function getProfile(userId) {
  try {
    const user = await User.findOne({ _id: userId });

    return {
      Data: _.pick(user.toObject(), [
        "username",
        "firstname",
        "lastname",
        "gender",
        "email",
        "picture",
      ]),
      Message: "User profile retrieved successfully.",
    };
  } catch (error) {
    if (error.status && error.code && error.message) {
      throw error;
    } else {
      throw new Error(error);
    }
  }
}

async function getUserProfile(username, userId) {
  try {
    const user = await User.findOne({
      username,
    });

    if (!user) {
      const error = {
        status: 404,
        code: "USER_NOT_FOUND",
        message: "The requested user could not be found.",
      };
      throw error;
    }

    let userData;
    if (user._id.toString() !== userId.toString()) {
      userData = _.omit(user.toObject(), [
        "_id",
        "email",
        "password",
        "role",
        "verified",
        "createdAt",
        "__v",
      ]);
    } else {
      userData = _.omit(user.toObject(), [
        "_id",
        "password",
        "role",
        "verified",
        "createdAt",
        "__v",
      ]);
    }

    return {
      Data: userData,
      Message: "User profile retrieved successfully.",
    };
  } catch (error) {
    if (error.status && error.code && error.message) {
      throw error;
    } else {
      throw new Error(error);
    }
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
        runValidators: true,
        new: true,
      }
    );

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
    if (error.status && error.code && error.message) {
      throw error;
    } else {
      throw new Error(error);
    }
  }
}

async function uploadProfilePicture(userId, filename, fileUrl) {
  try {
    const user = await User.findByIdAndUpdate(userId, {
      $set: {
        picture: {
          filename: filename,
          fileUrl: fileUrl,
          uploadAt: dateNow(),
        },
      },
      runValidators: true,
      new: true,
    });

    return {
      Data: user.picture,
      Message: "Profile picture uploaded successfully.",
    };
  } catch (error) {
    if (error.status && error.code && error.message) {
      throw error;
    } else {
      throw new Error(error);
    }
  }
}

async function forgetPassword(email) {
  try {
    const user = await User.findOne({ email });
    const token = await user.generateToken("15m");
    await sendForgotPasswordLink(user.username, user.email, user._id, token);

    return {
      message: `If an account with this email ${email} exists, we've sent a password reset link.`,
    };
  } catch (error) {
    if (error.status && error.code && error.message) {
      throw error;
    } else {
      throw new Error(error);
    }
  }
}

async function confirmPasswordToken(userId, token) {
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return notFound();
    }
    const userToken = await User.verifyToken(token);
    if (!userToken) {
      return expiredForgottenPasswordLink(user.username);
    } else {
      return resetForgettenPasswordLink(user.username);
    }
  } catch (error) {
    if (error.status && error.code && error.message) {
      throw error;
    } else {
      throw new Error(error);
    }
  }
}

async function resetPassword(userId, token, password) {
  try {
    const userToken = await User.verifyToken(token);
    if (!userToken) {
      return expiredForgottenPasswordLink();
    }

    const user = await User.findByIdAndUpdate(userId, {
      $set: {
        password: password,
      },
      runValidators: true,
      new: true,
    });

    if (!user) {
      return notFound();
    }

    return successForgettenPasswordLink(user.username);
  } catch (error) {
    if (error.status && error.code && error.message) {
      throw error;
    } else {
      throw new Error(error);
    }
  }
}

module.exports = {
  register,
  verify,
  login,
  getProfile,
  getUserProfile,
  updateUserProfile,
  uploadProfilePicture,
  forgetPassword,
  confirmPasswordToken,
  resetPassword,
};
