import { ProfileController } from './profile.controller';
import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.get(
  '/',
  auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN),
  ProfileController.getProfile
);

export const ProfileRoutes = router;
