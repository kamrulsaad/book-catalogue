import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Book } from '@prisma/client';
import httpStatus from 'http-status';
import { BookService } from './book.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.insertIntoDB(req.body);
  sendResponse<Book>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    data: result,
    message: 'Book created successfully',
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getAllBooks();
  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Books fetched successfully',
  });
});

export const BookController = {
  insertIntoDB,
  getAllBooks,
};
