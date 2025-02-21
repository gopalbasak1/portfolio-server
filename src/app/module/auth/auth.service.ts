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
    image: user?.image,
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

  return {
    accessToken,
    refreshToken,
  };
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
    image: user.image,
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

export const AuthServices = {
  registerFromDB,
  loginIntoDB,
  refreshToken,
};
