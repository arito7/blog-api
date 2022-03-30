import { body, validationResult } from 'express-validator';

export const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    return res.json(errors.array());
  }
  return next();
};

export const signupValidation = [
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

export const loginValidation = [
  body('username').exists().trim().isAlphanumeric().toLowerCase().escape(),
  body('password').exists().trim().escape(),
];

export const postUpdateValidation = [
  body('title').optional().trim().escape(),
  body('body').optional().trim().escape(),
  body('published')
    .isBoolean()
    .withMessage('Published must be boolean value.')
    .optional()
    .trim()
    .escape(),
];

export const postCreateValidation = [
  body('title').exists().trim().escape(),
  body('body').exists().trim().escape(),
  body('published')
    .optional()
    .trim()
    .escape()
    .isBoolean()
    .withMessage('Published must be boolean value.'),
];
