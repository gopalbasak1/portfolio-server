import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TProject } from './project.interface';
import httpStatus from 'http-status-codes';
import Project from './project.model';

const createProjectFromDB = async (email: string, payload: TProject) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  // 🔹 Attach user ID to payload
  payload.user = user._id;

  const result = await Project.create(payload);
  return result;
};

const getAllProjectIntoDB = async () => {
  const result = await Project.find().populate('user');
  return result;
};

const getSingleProjectIntoDB = async (id: string) => {
  const result = await Project.findById(id).populate('user');
  return result;
};

const updateProjectIntoDB = async (
  id: string,
  data: Partial<TProject>,
  // userEmail: string,
  // userRole: string,
) => {
  const project = await Project.findById(id);
  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, 'Project not found');
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

  const result = await Project.findByIdAndUpdate(id, data, {
    new: true,
  });
  //console.log(result);
  return result;
};

const deleteProjectFromDB = async (id: string) => {
  const project = await Project.findById(id);
  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, 'Project not found');
  }

  const result = await Project.findByIdAndDelete(id);

  return result;
};

const getProjectsByUserFromDB = async (userId: string) => {
  const result = await Project.find({ user: userId });
  return result;
};

export const ProjectServices = {
  createProjectFromDB,
  getAllProjectIntoDB,
  getSingleProjectIntoDB,
  updateProjectIntoDB,
  deleteProjectFromDB,
  getProjectsByUserFromDB,
};
