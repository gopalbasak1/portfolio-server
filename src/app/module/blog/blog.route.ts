import express from 'express';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { validationRequest } from '../../middleware/validationRequest';
import { BlogValidation } from './blog.validation';
import { BlogControllers } from './blog.controller';

const router = express.Router();

router.post(
  '/createBlog',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validationRequest(BlogValidation.createBlog),
  BlogControllers.createBlog,
);

router.get(
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin),
  BlogControllers.getAllBlogs,
);

router.get(
  '/:blogId',
  auth(USER_ROLE.user, USER_ROLE.admin),
  BlogControllers.getSingleBlog,
);

router.put(
  '/:blogId',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validationRequest(BlogValidation.updateBlog),
  BlogControllers.updateBlog,
);

router.delete(
  '/:blogId',
  auth(USER_ROLE.user, USER_ROLE.admin),
  BlogControllers.deleteBlog,
);

export const BlogRouter = router;
