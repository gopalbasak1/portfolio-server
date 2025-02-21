import Message from './message.model';
import { User } from '../user/user.model';

const createMessageIntoDB = async (
  name: string,
  email: string,
  message: string,
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
  }

  // Create and save the message
  const newMessage = await Message.create({
    user: userId || null, // If user is not logged in, leave it null
    name,
    email,
    message,
  });

  return newMessage;
};

const getMessageIntoDB = async () => {
  const result = await Message.find();
  return result;
};

export const MessageServices = {
  createMessageIntoDB,
  getMessageIntoDB,
};
