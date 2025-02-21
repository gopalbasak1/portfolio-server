import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import httpStatus from 'http-status-codes';
import { TBlog } from './blog.interface';
import Blog from './blog.model';

const createBlogFromDB = async (email: string, payload: TBlog) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  // 🔹 Attach user ID to payload
  payload.user = user._id;

  const result = await Blog.create(payload);
  return result;
};

const getAllBlogIntoDB = async () => {
  const result = await Blog.find();
  return result;
};

const getSingleBlogIntoDB = async (id: string) => {
  const result = await Blog.findById(id);
  return result;
};

const updateBlogIntoDB = async (
  id: string,
  data: Partial<TBlog>,
  userEmail: string,
  userRole: string,
) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  // Get the blog creator
  const blogOwner = await User.findById(blog?.user);

  // Only allow the creator or admin to update
  if (blogOwner?.email !== userEmail && userRole !== 'admin') {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update this blog',
    );
  }

  const result = await Blog.findByIdAndUpdate(id, data, {
    new: true,
  });
  //console.log(result);
  return result;
};

const deleteBlogFromDB = async (
  id: string,
  userEmail: string,
  userRole: string,
) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  const blogOwner = await User.findById(blog?.user);

  if (!blogOwner) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog owner not found');
  }
  // Only allow the creator or admin to delete
  if (blogOwner?.email !== userEmail && userRole !== 'admin') {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You do not have permission to delete this blog',
    );
  }

  const result = await Blog.findByIdAndDelete(id);

  return result;
};

export const BlogServices = {
  createBlogFromDB,
  getAllBlogIntoDB,
  getSingleBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
