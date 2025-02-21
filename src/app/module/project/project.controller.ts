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
  const result = await ProjectServices.getAllProjectIntoDB();

  //res status
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'All Project are retrieved successfully',
    data: result,
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

const updateProject = catchAsync(async (req, res) => {
  const projectId = req.params.projectId;
  const userEmail = req.user?.email;
  const userRole = req.user?.role;
  const body = req.body;
  const result = await ProjectServices.updateProjectIntoDB(
    projectId,
    body,
    userEmail as string,
    userRole as string,
  );
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
  const userEmail = req.user?.email;
  const userRole = req.user?.role;
  const result = await ProjectServices.deleteProjectFromDB(
    projectId,
    userEmail as string,
    userRole as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project is deleted',
    data: result,
  });
});

export const ProjectControllers = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
