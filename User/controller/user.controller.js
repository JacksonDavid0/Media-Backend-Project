const handleError = require("../middleware/errorHandler");
const { register, verify, login } = require("../services/user.service");

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

module.exports = { registerUser, verifyUser, loginUser };
