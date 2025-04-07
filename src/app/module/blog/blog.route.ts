import express from 'express';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { validationRequest } from '../../middleware/validationRequest';
import { BlogValidation } from './blog.validation';
import { BlogControllers } from './blog.controller';

const router = express.Router();

router.post(
  '/create-blog',
  auth(USER_ROLE.admin),
  validationRequest(BlogValidation.createBlog),
  BlogControllers.createBlog,
);

router.get('/', BlogControllers.getAllBlogs);

router.get(
  '/:blogId',
  auth(USER_ROLE.admin, USER_ROLE.user),
  BlogControllers.getSingleBlog,
);

router.put(
  '/:blogId',
  auth(USER_ROLE.admin),
  validationRequest(BlogValidation.updateBlog),
  BlogControllers.updateBlog,
);

router.delete('/:blogId', auth(USER_ROLE.admin), BlogControllers.deleteBlog);

export const BlogRouter = router;
