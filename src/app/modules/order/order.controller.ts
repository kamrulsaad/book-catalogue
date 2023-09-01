import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { OrderService } from './order.service';
import { JwtPayload } from 'jsonwebtoken';
import sendResponse from '../../../shared/sendResponse';
import { Order } from '@prisma/client';
import httpStatus from 'http-status';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.insertIntoDB(
    req.body,
    req.user as JwtPayload
  );

  sendResponse<Order>(res, {
    statusCode: httpStatus.CREATED,
    message: 'Order created successfully',
    data: result,
    success: true,
  });
});

export const OrderController = {
  insertIntoDB,
};
