const { handleError } = require("../../../errorHandler");
const {
  register,
  verify,
  login,
  getUserProfile,
  updateUserProfile,
  uploadProfilePicture,
  forgetPassword,
  confirmPasswordToken,
  getProfile,
} = require("../services/user.service");
const userValidator = require("../middleware/user.validator");

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
    await userValidator({
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

    let picture = {};
    if (req.file) {
      picture = {
        filename: req.file.filename,
        fileUrl: `/userUploads/${req.file.filename}`,
      };
    }

    const user = await register(
      username,
      firstname,
      lastname,
      gender,
      email,
      phone,
      dob,
      address,
      picture,
      password
    );
    res.status(201).json(user);
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
      sameSite: "None",
      maxAge: 604800000,
    });

    res.status(200).send(user.Data, user.Message);
    // console.log(user.Message);
  } catch (error) {
    handleError(req, res, error);
  }
}

async function validateUser(req, res) {
  const body = req.body;
  try {
    await userValidator(body);
    return res.status(200).send();
  } catch (error) {
    handleError(req, res, error);
  }
}

async function profile(req, res) {
  const userId = req.authorizeUserId;
  try {
    const user = await getProfile(userId);
    res.status(200).send(user);
    // console.log(user.Message);
  } catch (error) {
    handleError(req, res, error);
  }
}

async function userProfile(req, res) {
  const { username } = req.params;
  const userId = req.authorizeUserId;
  try {
    await userValidator({ username });
    const user = await getUserProfile(username, userId);
    // console.log(user.Message);
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    handleError(req, res, error);
  }
}

async function updateProfile(req, res) {
  if (!req.body) {
    const error = {
      status: 400,
      code: "MISSING_REQUEST_BODY",
      message:
        "The request body is required but was not provided or is undefined.",
      details: [
        {
          field: null,
          message: "Expected a request body, but 'req.body' is undefined.",
        },
      ],
    };

    return res.status(400).json(error);
  }
  const { username, firstname, lastname, gender, email, phone, dob, address } =
    req.body;
  const userId = req.authorizeUserId;
  const picture = {
    filename: req.file.filename,
    fileUrl: `/postUploads/${req.file.filename}`,
  };
  try {
    await userValidator({
      username,
      firstname,
      lastname,
      gender,
      email,
      phone,
      dob,
      address,
      picture,
    });

    const user = await updateUserProfile(
      userId,
      username,
      firstname,
      lastname,
      gender,
      email,
      phone,
      dob,
      address
    );
    res.status(200).send(user);
    // console.log(user.Message);
  } catch (error) {
    handleError(req, res, error);
  }
}

async function uploadPicture(req, res) {
  try {
    await userValidator({ picture: req.file.image });
    const userId = req.authorizeUserId;
    const user = await uploadProfilePicture(
      userId,
      req.file.filename,
      `/userUploads/${req.file.filename}`
    );
    res.status(200).send(user);
    // console.log(user.Message);
  } catch (error) {
    handleError(req, res, error);
  }
}

async function forgettenPassword(req, res) {
  const { email } = req.body;
  try {
    await userValidator({ email });
    const user = await forgetPassword(email);
    res.status(200).send(user);
  } catch (error) {
    handleError(req, res, error);
  }
}

async function verifyUser(req, res) {
  const { userId, token } = req.params;
  try {
    const user = await verify(userId, token);
    res.status(200).send(user.Data);
  } catch (error) {
    handleError(req, res, error);
  }
}

async function confirmForgettenPasswordToken(req, res) {
  const { userId, token } = req.params;
  try {
    const user = await confirmPasswordToken(userId, token);
    res.status(200).send(user);
  } catch (error) {
    handleError(req, res, error);
  }
}

async function resetForgettenPassword(req, res) {
  const { userId, token } = params;
  const { password } = req.body;
  try {
    const user = await resetPassword(userId, token, password);
    res.status(200).send(user);
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
  validateUser,
  profile,
  userProfile,
  updateProfile,
  uploadPicture,
  forgettenPassword,
  confirmForgettenPasswordToken,
  resetForgettenPassword,
  logoutUser,
};
