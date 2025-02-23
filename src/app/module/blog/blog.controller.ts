import httpStatus from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AppError from '../../errors/AppError';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const email = req.user?.email;
  const payload = req.body;
  const result = await BlogServices.createBlogFromDB(email as string, payload);

  //res status
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blogs create successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogIntoDB();

  //res status
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'All Blog are retrieved successfully',
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const result = await BlogServices.getSingleBlogIntoDB(blogId);
  //console.log(result);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found!');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog is retrieved successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const blogId = req.params.blogId;

  // const userEmail = req.user?.email;
  // const userRole = req.user?.role;
  const body = req.body;
  const result = await BlogServices.updateBlogIntoDB(
    blogId,
    body,
    // userEmail as string,
    // userRole as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog update successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const blogId = req.params.blogId;
  // const userEmail = req.user?.email;
  // const userRole = req.user?.role;
  const result = await BlogServices.deleteBlogFromDB(
    blogId,
    // userEmail as string,
    // userRole as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog is deleted',
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
