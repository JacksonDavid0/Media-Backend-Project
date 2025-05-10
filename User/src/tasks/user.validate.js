const Joi = require("joi");

// Define the Joi schema based on your Mongoose schema
const userSchema = Joi.object({
  username: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z0-9_]+$/)
    .messages({
      "string.base": "Username must be a string",
      "string.empty": "Username cannot be empty",
      "string.trim": "Username cannot contain leading or trailing whitespace",
      "string.min": "Username must be at least {#limit} characters long",
      "string.max": "Username must be at most {#limit} characters long",
      "string.pattern.base":
        "Username must only contain letters, numbers, and underscores",
    }),

  firstname: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z]+$/)
    .messages({
      "string.base": "First name must be a string",
      "string.empty": "First name cannot be empty",
      "string.trim": "First name cannot contain leading or trailing whitespace",
      "string.min": "First name must be at least {#limit} characters long",
      "string.max": "First name must be at most {#limit} characters long",
      "string.pattern.base": "First name must only contain letters",
    }),

  lastname: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z]+$/)
    .messages({
      "string.base": "Last name must be a string",
      "string.empty": "Last name cannot be empty",
      "string.trim": "Last name cannot contain leading or trailing whitespace",
      "string.min": "Last name must be at least {#limit} characters long",
      "string.max": "Last name must be at most {#limit} characters long",
      "string.pattern.base": "Last name must only contain letters",
    }),

  gender: Joi.string()
    .trim()
    .lowercase()
    .valid("male", "female", "other", "")
    .messages({
      "string.base": "Gender must be a string",
      "string.empty": "Gender cannot be empty",
      "string.trim": "Gender cannot contain leading or trailing whitespace",
      "string.lowercase": "Gender must be in lowercase",
      "any.only": "Invalid gender",
    }),

  email: Joi.string().email().trim().lowercase().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email cannot be empty",
    "string.email": "Invalid email address",
    "string.trim": "Email cannot contain leading or trailing whitespace",
    "string.lowercase": "Email must be in lowercase",
  }),

  phone: Joi.string().trim().allow("").pattern(/^\d+$/).messages({
    "string.base": "Phone number must be a string",
    "string.trim": "Phone number cannot contain leading or trailing whitespace",
    "string.pattern.base": "Invalid phone number format",
  }),

  dob: Joi.date().allow(null).messages({
    "date.base": "Invalid date of birth",
  }),

  address: Joi.string().trim().allow("").max(100).messages({
    "string.base": "Address must be a string",
    "string.trim": "Address cannot contain leading or trailing whitespace",
    "string.max": "Address must be at most {#limit} characters long",
  }),

  picture: Joi.string()
    .trim()
    .allow("")
    .uri({ scheme: ["http", "https"] })
    .messages({
      "string.base": "Picture URL must be a string",
      "string.trim":
        "Picture URL cannot contain leading or trailing whitespace",
      "string.uri": "Invalid picture URL",
    }),

  role: Joi.string().valid("user", "admin").default("user").messages({
    "string.base": "Role must be a string",
    "any.only": "Invalid role",
  }),

  password: Joi.string().trim().min(8).messages({
    "string.base": "Password must be a string",
    "string.empty": "Password cannot be empty",
    "string.trim": "Password cannot contain leading or trailing whitespace",
    "string.min": "Password must be at least {#limit} characters long",
  }),

  verified: Joi.boolean().default(false).messages({
    "boolean.base": "Verified must be a boolean",
  }),

  createdAt: Joi.date()
    .default(() => new Date())
    .messages({
      "date.base": "Invalid creation date",
    }),
});

const dataValidator = async (data) => {
  const { error } = userSchema.validate(data, {
    abortEarly: false,
    presence: "optional",
  });

  if (error) {
    const err = {
      status: 400,
      code: "INVALID_INPUT_DATA",
      message: "One or more fields contain invalid data.",
      details: error.details.map((detail) => {
        return { field: detail.path[0], message: detail.message };
      }),
    };
    throw err;
  }
  return true;
};

module.exports = dataValidator;
