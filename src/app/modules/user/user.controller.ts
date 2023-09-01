import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import { User } from '@prisma/client';
import httpStatus from 'http-status';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();

  sendResponse<User[]>(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
  });
});

const getOneFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getOneFromDB(req.params.id);
  sendResponse<User | null>(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
  });
});

const updateUserInDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateUserInDB(req.params.id, req.body);
  sendResponse<User | null>(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteUser(req.params.id);
  sendResponse<User | null>(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
  });
});

export const UserController = {
  getAllUsers,
  getOneFromDB,
  updateUserInDB,
  deleteUser,
};
