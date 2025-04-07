import express from 'express';

import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { SkillControllers } from './skills.controller';

const router = express.Router();

router.post(
  '/create-skill',
  auth(USER_ROLE.admin),
  SkillControllers.createSkill,
);

router.get('/', SkillControllers.getAllSkills);

router.get(
  '/:skillId',
  auth(USER_ROLE.admin, USER_ROLE.user),
  SkillControllers.getSingleSkill,
);

router.put('/:skillId', auth(USER_ROLE.admin), SkillControllers.updateSkill);

router.delete('/:skillId', auth(USER_ROLE.admin), SkillControllers.deleteSkill);

export const SkillsRouter = router;
