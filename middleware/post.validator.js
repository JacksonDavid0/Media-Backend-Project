const Joi = require("joi");

const postSchemaValidation = Joi.object({
  content: Joi.string().required().trim().min(10).messages({
    "string.base": "Content must be a string",
    "string.empty": "Content is required",
    "any.required": "Content is required",
    "string.min": "Content must be at least {#limit} characters long",
  }),
  //   image: Joi.string()
  //     .trim()
  //     .allow("")
  //     .uri({ scheme: ["http", "https"] })
  //     .messages({
  //       "string.base": "Image URL must be a string",
  //       "string.trim": "Image URL cannot contain leading or trailing whitespace",
  //       "string.uri": "Invalid image URL",
  //     }),

  likes: Joi.number().default(0),
});

const postValidator = async (data) => {
  const { error } = postSchemaValidation.validate(data, {
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

module.exports = { postValidator };
