const { body, validationResult } = require('express-validator');

exports.checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    return res.json(errors.array());
  }
  return next();
};

exports.signupValidation = [
  body('username', 'Username field is required')
    .exists()
    .trim()
    .isAlphanumeric()
    .toLowerCase()
    .escape(),
  body('password', 'Password cannot be empty').exists().trim().escape(),
  body('rpassword')
    .exists()
    .custom((val, { req }) => val === req.body.password)
    .withMessage('Passwords do not match.')
    .trim()
    .escape(),
];

exports.loginValidation = [
  body('username').exists().trim().isAlphanumeric().toLowerCase().escape(),
  body('password').exists().trim().escape(),
];

exports.postUpdateValidation = [
  body('title').optional().trim().escape(),
  body('body').optional().trim().escape(),
  body('published')
    .isBoolean()
    .withMessage('Published must be boolean value.')
    .optional()
    .trim()
    .escape(),
];

exports.postCreateValidation = [
  body('title').exists().trim().escape(),
  body('body').exists().trim().escape(),
  body('published')
    .optional()
    .trim()
    .escape()
    .isBoolean()
    .withMessage('Published must be boolean value.'),
];
