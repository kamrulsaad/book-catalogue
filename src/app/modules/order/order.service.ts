import { Order } from '@prisma/client';
import { IOrderedBooksRequest } from './order.interface';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const insertIntoDB = async (
  data: IOrderedBooksRequest,
  userData: JwtPayload
): Promise<Order> => {
  const result = await prisma.$transaction(async transaction => {
    const order = await transaction.order.create({
      data: {
        userId: userData.userId,
      },
    });

    for (const index of data.orderedBooks) {
      await transaction.orderedBook.create({
        data: {
          bookId: index.bookId,
          orderId: order.id,
          quantity: index.quantity,
        },
      });
    }

    const result = await transaction.order.findUnique({
      where: {
        id: order.id,
      },
      include: {
        orderedBooks: true,
      },
    });

    if (!result) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Something went wrong'
      );
    }

    return result;
  });

  return result;
};

export const OrderService = {
  insertIntoDB,
};
