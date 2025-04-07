/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const getAllUsers = catchAsync(async (req, res) => {
  console.log('Query Params:', req.query); // Log the query
  const result = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleUsers = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.getSingleUserIntoDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  if (!req.user || !req.user.id) {
    return sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Unauthorized: No user found',
      data: null,
    });
  }
  const { id, role } = req.user;
  const result = await UserServices.getMe(id, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const updatedUser = await UserServices.updatedUserIntoDB(userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: updatedUser,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  if (!req.user) {
    return sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Unauthorized: No user found',
      data: null,
    });
  }
  const { userId } = req.params;
  const loggedInUserId = req.user.id;

  // Check if the logged-in user is an admin
  if (req.user.role !== 'admin') {
    return sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Unauthorized: Only admin can delete users',
      data: null,
    });
  }

  // Prevent an admin from deleting their own account
  if (loggedInUserId === userId) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Admin cannot delete their own account',
      data: null,
    });
  }

  const result = await UserServices.deleteUserIntoDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: null,
  });
});

export const UserControllers = {
  getAllUsers,
  getSingleUsers,
  getMe,
  updateUser,
  deleteUser,
};
