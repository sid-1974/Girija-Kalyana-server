// const Joi = require("joi");

// const aboutValidation = (req, res, next) => {
//   const schema = Joi.object({
//     // fullName: Joi.string().min(3).max(100).required(),
//     // phoneNumber: Joi.string()
//     //   .pattern(/^\d{10}$/)
//     //   .required()
//     //   .messages({ "string.pattern.base": "Phone number must be 10 digits" }),
//     // email: Joi.string().email().required(),
//     age: Joi.number().min(0).max(120).required().messages({
//       "number.base": "Age must be a number",
//       "number.min": "Age cannot be less than 0",
//       "number.max": "Age cannot be more than 120",
//     }),
//     address: Joi.string().min(3).max(200).required(),
//     pincode: Joi.string()
//       .pattern(/^\d{6}$/)
//       .required()
//       .messages({ "string.pattern.base": "Pincode must be 6 digits" }),
//     city: Joi.string().min(2).max(100).required(),
//     state: Joi.string().min(2).max(100).required(),
//     country: Joi.string().min(2).max(100).required(),
//     // dateOfBirth: Joi.date().required().messages({
//     //   "date.base": "Date of Birth must be a valid date",
//     // }),
//     // height: Joi.number().min(30).max(300).required().messages({
//     //   "number.base": "Height must be a number",
//     //   "number.min": "Height must be at least 30 cm",
//     //   "number.max": "Height cannot exceed 300 cm",
//     // }),
//     gender: Joi.string().valid("Male", "Female").required(),
//     language: Joi.array()
//       .items(Joi.string().min(2).max(50))
//       .required()
//       .messages({
//         "array.base": "Language must be an array of strings",
//         "string.min": "Each language must have at least 2 characters",
//         "string.max": "Each language cannot exceed 50 characters",
//       }),
//     maritalStatus: Joi.string().valid("Single", "Married").required(),
//   });

//   const { error } = schema.validate(req.body, { abortEarly: false });
//   if (error) {
//     return res.status(400).json({
//       message: "Validation failed",
//       errors: error.details.map((err) => err.message),
//     });
//   }
//   next();
// };

// module.exports = aboutValidation;
