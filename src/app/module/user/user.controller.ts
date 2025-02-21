import httpStatus from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',

    data: result,
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

export const UserControllers = {
  getAllUsers,
  getSingleUsers,
  getMe,
};
