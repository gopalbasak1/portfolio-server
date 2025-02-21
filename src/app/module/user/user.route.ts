import express from 'express';
import { UserControllers } from './user.controller';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUsers);
router.get('/me', auth(USER_ROLE.admin, USER_ROLE.user), UserControllers.getMe);
router.get('/:userId', UserControllers.getSingleUsers);

export const UserRouter = router;
