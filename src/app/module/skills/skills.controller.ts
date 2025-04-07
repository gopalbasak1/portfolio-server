/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AppError from '../../errors/AppError';
import { SkillServices } from './skills.service';

const createSkill = catchAsync(async (req, res) => {
  const email = req.user?.email;
  const payload = req.body;
  const result = await SkillServices.createSkillFromDB(
    email as string,
    payload,
  );

  //res status
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Skill create successfully',
    data: result,
  });
});

const getAllSkills = catchAsync(async (req, res) => {
  const result = await SkillServices.getAllSkillIntoDB(req.query);

  //res status
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'All Skill are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleSkill = catchAsync(async (req, res) => {
  const { skillId } = req.params;
  const result = await SkillServices.getSingleSkillIntoDB(skillId);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Skill not found!');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill is retrieved successfully',
    data: result,
  });
});

// const getMyProjects = catchAsync(async (req, res) => {
//   const userId = req.user?.id;
//   if (!userId) {
//     throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
//   }
//   const result = await ProjectServices.getProjectsByUserFromDB(
//     userId,
//     req.query,
//   );
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User projects retrieved successfully',
//     meta: result.meta,
//     data: result.result,
//   });
// });

const updateSkill = catchAsync(async (req, res) => {
  const skillId = req.params.skillId;

  const body = req.body;
  const result = await SkillServices.updateSkillIntoDB(skillId, body);
  //console.log(result);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill update successfully',
    data: result,
  });
});

const deleteSkill = catchAsync(async (req, res) => {
  const skillId = req.params.skillId;

  const result = await SkillServices.deleteSkillFromDB(skillId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill is deleted',
    data: {},
  });
});

export const SkillControllers = {
  createSkill,
  getAllSkills,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};
