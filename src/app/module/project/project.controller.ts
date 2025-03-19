/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProjectServices } from './project.service';
import AppError from '../../errors/AppError';

const createProject = catchAsync(async (req, res) => {
  const email = req.user?.email;
  const payload = req.body;
  const result = await ProjectServices.createProjectFromDB(
    email as string,
    payload,
  );

  //res status
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Products create successfully',
    data: result,
  });
});

const getAllProjects = catchAsync(async (req, res) => {
  const result = await ProjectServices.getAllProjectIntoDB(req.query);

  //res status
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'All Project are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleProject = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const result = await ProjectServices.getSingleProjectIntoDB(projectId);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Project not found!');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project is retrieved successfully',
    data: result,
  });
});

const getMyProjects = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }
  const result = await ProjectServices.getProjectsByUserFromDB(
    userId,
    req.query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User projects retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const projectId = req.params.projectId;

  const body = req.body;
  const result = await ProjectServices.updateProjectIntoDB(projectId, body);
  //console.log(result);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project update successfully',
    data: result,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const projectId = req.params.projectId;

  const result = await ProjectServices.deleteProjectFromDB(projectId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project is deleted',
    data: {},
  });
});

export const ProjectControllers = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
  getMyProjects,
};
