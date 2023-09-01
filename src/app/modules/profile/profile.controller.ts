import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ProfileService } from './profile.service';
import { JwtPayload } from 'jsonwebtoken';
import sendResponse from '../../../shared/sendResponse';
import { User } from '@prisma/client';
import httpStatus from 'http-status';

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.getProfile(
    (req.user as JwtPayload).userId
  );

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile retrieved successfully',
    data: result,
  });
});

export const ProfileController = {
  getProfile,
};
