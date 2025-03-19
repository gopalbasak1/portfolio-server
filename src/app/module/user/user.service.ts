/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status-codes';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { userSearchableFields } from './user.constant';
import { TUser } from './user.interface';

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .fields()
    .filter()
    .sort()
    .paginate();
  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();

  return {
    meta,
    result,
  };
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatedUserIntoDB = async (id: string, data: Partial<TUser | any>) => {
  const existingUser = await User.findById(id);
  if (!existingUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const updateData = data.user ? { ...data.user } : { ...data };

  const isEmailChanged =
    updateData.email && updateData.email !== existingUser.email;

  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  return {
    updatedUser,
    shouldLogout: isEmailChanged,
  };
};

const deleteUserIntoDB = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await User.findByIdAndDelete(userId);

  return result;
};

export const UserServices = {
  getAllUsersFromDB,
  getSingleUserIntoDB,
  getMe,
  updatedUserIntoDB,
  deleteUserIntoDB,
};
