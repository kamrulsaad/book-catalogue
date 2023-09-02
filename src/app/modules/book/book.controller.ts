import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Book } from '@prisma/client';
import httpStatus from 'http-status';
import { BookService } from './book.service';
import pick from '../../../shared/pick';
import { bookFilterableFields } from './book.constant';
import { paginationFields } from '../../../constants/pagination';

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
  const filters = pick(req.query, bookFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await BookService.getAllBooks(filters, options);
  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result.data,
    meta: result.meta,
    message: 'Books fetched successfully',
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getSingeBook(req.params.id);
  sendResponse<Book | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Book fetched successfully',
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.updateBook(req.params.id, req.body);
  sendResponse<Book | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Book updated successfully',
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.deleteBook(req.params.id);
  sendResponse<Book | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Book deleted successfully',
  });
});

const getBooksByCategory = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);
  const result = await BookService.getBooksByCategory(
    req.params.categoryId,
    options
  );
  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result.data,
    meta: result.meta,
    message: 'Books with associated category data fetched successfully',
  });
});

export const BookController = {
  insertIntoDB,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  getBooksByCategory,
};
