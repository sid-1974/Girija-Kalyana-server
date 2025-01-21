const Joi = require("joi");

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(100).required(),
    phoneNumber: Joi.string()
      .pattern(/^\d{10}$/)
      .required()
      .messages({ "string.pattern.base": "Phone number must be 10 digits" }),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({ "any.only": "Passwords do not match" }),
    userType: Joi.string().valid("user", "admin").required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Validation failed", error });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    identifier: Joi.string()
      .required()
      .messages({ "any.required": "Email or phone number is required" }),
    password: Joi.string()
      .min(6)
      .max(100)
      .required()
      .messages({
        "string.min": "Password must be at least 6 characters",
        "any.required": "Password is required",
      }),
    // userType: Joi.string().valid("user", "admin").required().messages({
    //   "any.only": "User type must be either 'user' or 'admin'",
    // }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Validation failed", error });
  }
  next();
};

module.exports = { signupValidation, loginValidation };
