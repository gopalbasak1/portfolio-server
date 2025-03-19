/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status-codes';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    imageUrls: {
      type: [String],
      default: [],
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  },
);

// Pre-save hook to hash the password
userSchema.pre('save', async function (next) {
  const user = this;

  //only hash the password if it is modified or new
  if (!user.isModified('password')) {
    return next();
  }
  if (!user.password) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password is required');
  }

  const saltRounds = Number(config.BCRYPT_SALT_ROUNDS) || 12; // Default to 12 if not configured;
  user.password = await bcrypt.hash(user.password, saltRounds);

  next();
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function (
  userPassword: string,
): Promise<boolean> {
  const user = this;
  return bcrypt.compare(userPassword, user.password);
};

//set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 100;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User', userSchema);
