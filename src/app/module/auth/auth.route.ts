import express from 'express';
import { validationRequest } from '../../middleware/validationRequest';
import { UserValidation } from '../user/user.validation';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

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

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validationRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

export const AuthRoutes = router;
