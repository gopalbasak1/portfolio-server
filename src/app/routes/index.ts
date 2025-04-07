import { Router } from 'express';
import { AuthRoutes } from '../module/auth/auth.route';
import { UserRouter } from '../module/user/user.route';
import { ProjectRouter } from '../module/project/project.route';
import { BlogRouter } from '../module/blog/blog.route';
import { MessageRouter } from '../module/message/message.route';
import { SkillsRouter } from '../module/skills/skills.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/projects',
    route: ProjectRouter,
  },
  {
    path: '/blogs',
    route: BlogRouter,
  },
  {
    path: '/messages',
    route: MessageRouter,
  },
  {
    path: '/skills',
    route: SkillsRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
