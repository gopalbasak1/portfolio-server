/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status-codes';
import { User } from './user.model';
import AppError from '../../errors/AppError';

const getAllUsersFromDB = async () => {
  const result = User.find();
  return result;
};

const getSingleUserIntoDB = async (id: string) => {
  const result = await User.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return result;
};

const getMe = async (userId: string, role: string) => {
  if (!userId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Unauthorized: No user ID provided',
    );
  }

  const result = await User.findById(userId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  return result;
};

export const UserServices = {
  getAllUsersFromDB,
  getSingleUserIntoDB,
  getMe,
};
