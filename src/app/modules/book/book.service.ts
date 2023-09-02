/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IBookFilterRequest } from './book.interface';
import { bookSearchableFields } from './book.constant';
import { IGenericResponse } from '../../../interfaces/common';

const insertIntoDB = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllBooks = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  const { minPrice, maxPrice, category } = filterData;

  if (minPrice) {
    andConditions.push({
      price: {
        gte: Number(minPrice),
      },
    });
  }

  if (maxPrice) {
    andConditions.push({
      price: {
        lte: Number(maxPrice),
      },
    });
  }

  if (category) {
    andConditions.push({
      categoryId: category,
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereConditions,
    include: {
      category: true,
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {},
  });

  const total = await prisma.book.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingeBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id: id,
    },
    include: {
      category: true,
    },
  });
  return result;
};

const updateBook = async (
  id: string,
  data: Partial<Book>
): Promise<Book | null> => {
  const result = await prisma.book.update({
    where: {
      id: id,
    },
    data: data,
    include: {
      category: true,
    },
  });
  return result;
};

const deleteBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.delete({
    where: {
      id: id,
    },
    include: {
      category: true,
    },
  });
  return result;
};

export const BookService = {
  insertIntoDB,
  getAllBooks,
  getSingeBook,
  updateBook,
  deleteBook,
};
