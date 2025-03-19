import express from 'express';
import { UserControllers } from './user.controller';
import { USER_ROLE } from './user.constant';
import { auth } from '../../middleware/auth';
import { validationRequest } from '../../middleware/validationRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUsers);
router.get('/me', auth(USER_ROLE.admin, USER_ROLE.user), UserControllers.getMe);
router.get(
  '/:userId',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getSingleUsers,
);

router.patch(
  '/:userId',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validationRequest(UserValidation.updateUser),
  UserControllers.updateUser,
);

router.delete(
  '/:userId',
  auth(USER_ROLE.admin),

  UserControllers.deleteUser,
);

export const UserRouter = router;
