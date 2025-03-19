/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import httpStatus from 'http-status-codes';
import { TLoginUser } from './auth.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createToken, verifyToken } from './auth.utils';
import { JwtPayload } from 'jsonwebtoken';

const registerFromDB = async (password: string, payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginIntoDB = async (payload: TLoginUser) => {
  //Validate the existence of the JWT secret
  if (!config.JWT_ACCESS_SECRET) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'JWT secret is not defined in the configuration.',
    );
  }

  //Is User exists checking
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );
  //console.log(user);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user email is not found !');
  }
  if (user?.isDeleted === false)
    throw new AppError(httpStatus.NOT_FOUND, 'This user is deleted !');
  // Is User block checking
  const isUserStatus = user?.status;
  //console.log(isUserBlocked);
  if (isUserStatus === 'blocked')
    throw new AppError(httpStatus.FORBIDDEN, 'This user is block !');

  //checking if the password is correct
  const isMatch = await bcrypt.compare(payload?.password, user?.password);

  if (!isMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Incorrect password!');
  }

  const jwtPayload = {
    email: user?.email,
    imageUrls: user?.imageUrls,
    phoneNumber: user?.phoneNumber,
    status: user?.status,
    role: user?.role,
    name: user?.name,
  };
  const accessToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    config.JWT_REFRESH_EXPIRES_IN as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.JWT_REFRESH_SECRET as string,
    config.JWT_REFRESH_EXPIRES_IN as string,
  );
  // const userInfo = {
  //   name: user?.name,
  //   phoneNumber: user?.phoneNumber,
  //   email: user?.email,
  //   imageUrls: user?.imageUrls,
  //   role: user?.role,
  //   userId: user?._id,
  //   status: user?.status,
  // };
  //console.log(userInfo);
  const result = {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
  //console.log(result);
  return result;
};

const refreshToken = async (token: string) => {
  //checking if the given token is valid
  const decoded = verifyToken(token, config.JWT_REFRESH_SECRET as string);

  const { email, iat } = decoded;

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted === false) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
    imageUrls: user?.imageUrls,
    phoneNumber: user?.phoneNumber,
  };

  const accessToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN as string,
  );

  return {
    accessToken,
  };
};

const changePasswordIntoDB = async (
  userData: JwtPayload | undefined,
  payload: { oldPassword: string; newPassword: string },
) => {
  if (!userData) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User is not authenticated');
  }

  let query = {};

  if (userData?.email) {
    query = { email: userData?.email };
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email is required');
  }

  const user = await User.findOne(query).select('+password');

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.status === 'blocked') {
    throw new AppError(httpStatus.BAD_REQUEST, 'This user is blocked.');
  }

  if (!user.password) {
    throw new AppError(httpStatus.NOT_FOUND, 'Password not found for user.');
  }

  const isMatch = await bcrypt.compare(payload.oldPassword, user.password);
  if (!isMatch) {
    throw new AppError(httpStatus.CONFLICT, ' Old password is incorrect.');
  }

  const saltRounds = Number(config.BCRYPT_SALT_ROUNDS) || 8;

  const newHashedPassword = await bcrypt.hash(payload.newPassword, saltRounds);

  const updateUser = await User.findOneAndUpdate(
    query,
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
    {
      new: true,
    },
  );

  if (!updateUser) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Password update failed',
    );
  }
};

export const AuthServices = {
  registerFromDB,
  loginIntoDB,
  refreshToken,
  changePasswordIntoDB,
};
