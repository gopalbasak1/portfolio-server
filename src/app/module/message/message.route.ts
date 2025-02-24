import express from 'express';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { MessageControllers } from './message.controller';
import { validationRequest } from '../../middleware/validationRequest';
import { MessageValidation } from './message.validation';

const router = express.Router();

router.post(
  '/send-message',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validationRequest(MessageValidation.createMessage),
  MessageControllers.createMessage,
);

router.get('/', MessageControllers.getAllMessage);

export const MessageRouter = router;
