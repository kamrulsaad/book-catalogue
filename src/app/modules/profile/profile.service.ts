import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const getProfile = async (id: string): Promise<User> => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Profile not found');
  }

  return result;
};

export const ProfileService = {
  getProfile,
};
