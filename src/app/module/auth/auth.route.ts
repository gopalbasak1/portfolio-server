import express from 'express';
import { validationRequest } from '../../middleware/validationRequest';
import { UserValidation } from '../user/user.validation';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/register',
  validationRequest(UserValidation.createUser),
  AuthControllers.register,
);

router.post(
  '/login',
  validationRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login,
);

router.post(
  '/refresh-token',
  validationRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

export const AuthRoutes = router;
