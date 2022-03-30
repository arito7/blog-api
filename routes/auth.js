import { Router } from 'express';
import { jwtAuth } from '../config/passport.js';
import {
  checkValidationResult,
  signupValidation,
  loginValidation,
} from '../config/validationSchemas.js';
import authController from '../controllers/authController.js';

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

export default router;
