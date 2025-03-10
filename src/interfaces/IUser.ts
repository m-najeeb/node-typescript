import { Document } from "mongoose";

export interface IUser extends Document {
  profilePicture?: string;
  fullName?: string;
  username: string;
  email?: string;
  phone?: string;
  country?: string;
  password?: string;
  otp?: string;
  otpExpiration?: Date;
  isEmailVerified: boolean;
  isOnline: boolean;
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
