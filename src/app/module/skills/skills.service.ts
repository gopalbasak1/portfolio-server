import AppError from '../../errors/AppError';
import { User } from '../user/user.model';

import httpStatus from 'http-status-codes';

import QueryBuilder from '../../builder/QueryBuilder';
import { TSkills } from './skills.interface';
import Skill from './skills.model';
import { skillSearchableFields } from './skills.constant';

const createSkillFromDB = async (email: string, payload: TSkills) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.role !== 'admin') {
    throw new AppError(httpStatus.FORBIDDEN, 'Only admin can post the skill');
  }
  // 🔹 Attach user ID to payload
  payload.user = user._id;

  const result = await Skill.create(payload);
  return result;
};

const getAllSkillIntoDB = async (query: Record<string, unknown>) => {
  const skillQuery = new QueryBuilder(Skill.find().populate('user'), query)
    .search(skillSearchableFields)
    .filter()
    .paginate()
    .sort()
    .fields();
  const result = await skillQuery.modelQuery;
  const meta = await skillQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleSkillIntoDB = async (id: string) => {
  const result = await Skill.findById(id).populate('user');
  return result;
};

const updateSkillIntoDB = async (
  id: string,
  data: Partial<TSkills>,
  // userEmail: string,
  // userRole: string,
) => {
  const skill = await Skill.findById(id);
  if (!skill) {
    throw new AppError(httpStatus.NOT_FOUND, 'Skill not found');
  }

  // // Get the project creator
  // const projectOwner = await User.findById(project?.user);

  // // Only allow the creator or admin to update
  // if (projectOwner?.email !== userEmail && userRole !== 'admin') {
  //   throw new AppError(
  //     httpStatus.FORBIDDEN,
  //     'You do not have permission to update this project',
  //   );
  // }

  const result = await Skill.findByIdAndUpdate(id, data, {
    new: true,
  });
  //console.log(result);
  return result;
};

const deleteSkillFromDB = async (id: string) => {
  const skill = await Skill.findById(id);
  if (!skill) {
    throw new AppError(httpStatus.NOT_FOUND, 'Skill not found');
  }

  const result = await Skill.findByIdAndDelete(id);

  return result;
};

// const getSkillsByUserFromDB = async (
//   userId: string,
//   query: Record<string, unknown>,
// ) => {
//   const mySkillQuery = new QueryBuilder(Skill.find({ user: userId }), query)
//     .search(skillSearchableFields)
//     .filter()
//     .paginate();

//   const result = await mySkillQuery.modelQuery;
//   const meta = await mySkillQuery.countTotal();

//   return {
//     meta,
//     result,
//   };
// };

export const SkillServices = {
  createSkillFromDB,
  getAllSkillIntoDB,
  getSingleSkillIntoDB,
  updateSkillIntoDB,
  deleteSkillFromDB,
};
