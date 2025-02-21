import httpStatus from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import { MessageServices } from './message.service';

const createMessage = catchAsync(async (req, res) => {
  const { name, email, message } = req.body;

  // Get the logged-in user's ID (if any) from `req.user`
  const userId = req?.user ? req.user.id : undefined;

  const result = await MessageServices.createMessageIntoDB(
    name,
    email,
    message,
    userId,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Message sent successfully!',
    data: result,
  });
});

const getAllMessage = catchAsync(async (req, res) => {
  const result = await MessageServices.getMessageIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'All Messages are retrieved successfully!',
    data: result,
  });
});
export const MessageControllers = {
  createMessage,
  getAllMessage,
};
