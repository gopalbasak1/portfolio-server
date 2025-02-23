import express from 'express';
import { validationRequest } from '../../middleware/validationRequest';
import { ProjectValidation } from './project.validation';
import { ProjectControllers } from './project.controller';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-project',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validationRequest(ProjectValidation.createProject),
  ProjectControllers.createProject,
);

router.get(
  '/',
  //auth(USER_ROLE.user, USER_ROLE.admin),
  ProjectControllers.getAllProjects,
);

router.get(
  '/my-projects',
  auth(USER_ROLE.user, USER_ROLE.admin),
  ProjectControllers.getMyProjects,
);

router.get(
  '/:projectId',
  //auth(USER_ROLE.user, USER_ROLE.admin),
  ProjectControllers.getSingleProject,
);

router.put(
  '/:projectId',
  //auth(USER_ROLE.user, USER_ROLE.admin),
  validationRequest(ProjectValidation.updateProject),
  ProjectControllers.updateProject,
);

router.delete(
  '/:projectId',
  //auth(USER_ROLE.user, USER_ROLE.admin),
  ProjectControllers.deleteProject,
);

export const ProjectRouter = router;
