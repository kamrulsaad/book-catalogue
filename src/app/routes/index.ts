import express from 'express';
import { UserRoute } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    routes: UserRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));

export default router;
