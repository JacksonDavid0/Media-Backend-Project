const User = require("../model/user.model");
const _ = require("lodash");
const { scheduleUserDelete } = require("../tasks/user.agenda");
const {
  sendActivationLink,
  expiredVerificationLink,
  activatedVerificationLink,
} = require("../mail/sendmail");

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
    await sendActivationLink(user.username, user.email, token);
    return {
      Data: `User: ${user.username} registered successfully.`,
      Message:
        "We've sent a verification link to your email. Please activate/verify your account.",
    };
  } catch (error) {
    throw new Error(error);
  }
}

async function verify(token) {
  try {
    const userId = await User.verifyToken(token);
    if (!userId) {
      return {
        Data: expiredVerificationLink(),
        Message: "User verification expired",
      };
    }
    const user = await User.findByIdAndUpdate(userId, { verified: true });
    if (!user) {
      return {
        Data: expiredVerificationLink(),
        Message: "User verification expired",
      };
    }

    return {
      Data: activatedVerificationLink(user.username),
      Message: "User verified successfully.",
    };
  } catch (error) {
    throw new Error(error);
  }
}

async function login(email) {
  try {
    const user = await User.findOne({ email: email });
    const token = await user.generateToken("7d");
    return {
      Data: _.omit(user, ["password", "__v"]),
      Token: token,
      Message: "User logged in successfully.",
    };
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  register,
  verify,
  login,
};
