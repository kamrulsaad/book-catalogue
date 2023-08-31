import { User } from '@prisma/client';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.insertIntoDB(req.body);
  sendResponse<User>(res, {
    statusCode: httpStatus.CREATED,
    message: 'User created successfully',
    data: result,
    success: true,
  });
});

export const UserController = {
  insertIntoDB,
};
