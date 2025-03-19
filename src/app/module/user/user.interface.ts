/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUser = {
  name: string;
  role: 'admin' | 'user';
  email: string;
  phoneNumber: string;
  imageUrls?: string[];
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  password: string;
  status: 'active' | 'blocked';
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
export type TUserRole = keyof typeof USER_ROLE;
