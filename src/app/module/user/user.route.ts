import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.get(
  '/',
  //   auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getAllUsers,
);
router.get('/me', UserControllers.getMe);
router.get('/:userId', UserControllers.getSingleUsers);

export const UserRouter = router;
