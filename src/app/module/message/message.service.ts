import Message from './message.model';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createMessageIntoDB = async (
  name: string,
  email: string,
  message: string,
  phoneNumber: string,
  userId?: string, // Optional user ID for logged-in users
) => {
  let user = null;

  // If a user is logged in, find the user in the database
  if (userId) {
    user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Auto-fill name and email from the user if not provided
    if (!name) name = user.name;
    if (!email) email = user.email;
    if (!phoneNumber) phoneNumber = user.phoneNumber;
  }

  // Create and save the message
  const newMessage = await Message.create({
    user: userId || null, // If user is not logged in, leave it null
    name,
    email,
    phoneNumber,
    message,
  });

  return newMessage;
};

const getMessageIntoDB = async (query: Record<string, unknown>) => {
  const messageQuery = new QueryBuilder(Message.find().populate('user'), query);
  const result = await messageQuery.modelQuery;
  const meta = await messageQuery.countTotal();
  return {
    meta,
    result,
  };
};

export const MessageServices = {
  createMessageIntoDB,
  getMessageIntoDB,
};
