import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const getAllUsers = async (): Promise<User[]> => {
  const result = await prisma.user.findMany();
  return result;
};

const getOneFromDB = async (id: string): Promise<User> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  return result;
};

const updateUserInDB = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...payload,
    },
  });
  return result;
};

const deleteUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  getAllUsers,
  getOneFromDB,
  updateUserInDB,
  deleteUser,
};
