const handleError = require("../middleware/errorHandler");
const {
  register,
  verify,
  login,
  getUserProfile,
} = require("../services/user.service");
const dataValidator = require("../tasks/user.validate");

async function registerUser(req, res) {
  const {
    username,
    firstname,
    lastname,
    gender,
    email,
    phone,
    dob,
    address,
    password,
  } = req.body;

  try {
    await dataValidator({
      username,
      firstname,
      lastname,
      gender,
      email,
      phone,
      dob,
      address,
      password,
    });
    const user = await register(
      username,
      firstname,
      lastname,
      gender,
      email,
      phone,
      dob,
      address,
      password
    );
    res.status(201).json(user);
    console.log(user.Data);
  } catch (error) {
    handleError(req, res, error);
  }
}

async function verifyUser(req, res) {
  const { token, userId } = req.params;
  try {
    const user = await verify(token, userId);
    res.status(200).send(user.Data);
    console.log(user.Message);
  } catch (error) {
    handleError(req, res, error);
  }
}

async function loginUser(req, res) {
  const { email } = req.body;
  try {
    await dataValidator({ email });
    const user = await login(email);
    res.cookie("userToken", user.Token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 604800000,
    });

    res.status(200).send(user.Data);
    console.log(user.Message);
  } catch (error) {
    handleError(req, res, error);
  }
}

async function userProfile(req, res) {
  const { username } = req.params;
  const userId = req.authorizeUserId;
  try {
    await dataValidator({ username });
    const user = await getUserProfile(username, userId);
    console.log(user.Message);
    return res.status(200).send(user.Data);
  } catch (error) {
    handleError(req, res, error);
  }
}

async function logoutUser(req, res) {
  res.clearCookie("userToken", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
  res.status(200).json({ message: "User logged out successfully." });
}

module.exports = {
  registerUser,
  verifyUser,
  loginUser,
  userProfile,
  logoutUser,
};
