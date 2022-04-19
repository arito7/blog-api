const Router = require('express').Router;
const { jwtAuth } = require('../config/passport');
const {
  checkValidationResult,
  signupValidation,
  loginValidation,
} = require('../config/validationSchemas');
const authController = require('../controllers/authController');

const router = Router();

router.post(
  '/register',
  signupValidation,
  checkValidationResult,
  authController.register
);

router.post(
  '/login',
  loginValidation,
  checkValidationResult,
  authController.login
);

// auth test route
router.get('/protected', jwtAuth, (req, res) => {
  res.send('successfully authenticated');
});

module.exports = router;
