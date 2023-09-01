import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { CategoryService } from './category.service';
import sendResponse from '../../../shared/sendResponse';
import { Category } from '@prisma/client';
import httpStatus from 'http-status';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.insertIntoDB(req.body);
  sendResponse<Category>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    data: result,
    message: 'Category created successfully',
  });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategories();
  sendResponse<Category[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'All categories fetched successfully',
  });
});

const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getSingleCategory(req.params.id);
  sendResponse<Category | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Category fetched successfully',
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.updateCategory(req.params.id, req.body);
  sendResponse<Category | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Category updated successfully',
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.deleteCategory(req.params.id);
  sendResponse<Category | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Category deleted successfully',
  });
});

export const CategoryController = {
  insertIntoDB,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
