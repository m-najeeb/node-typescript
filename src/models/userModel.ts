import mongoose, { Schema, Document, Model } from "mongoose";

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

const userSchema: Schema<IUser> = new mongoose.Schema<IUser>(
  {
    profilePicture: {
      type: Schema.Types.String,
    },
    fullName: {
      type: Schema.Types.String,
    },
    username: {
      type: Schema.Types.String,
      unique: true,
      required: true,
    },
    email: {
      type: Schema.Types.String,
    },
    phone: {
      type: Schema.Types.String,
    },
    country: {
      type: Schema.Types.String,
    },
    password: {
      type: Schema.Types.String,
    },
    otp: {
      type: Schema.Types.String,
      expires: "10m",
    },
    otpExpiration: {
      type: Schema.Types.Date,
    },
    isEmailVerified: {
      type: Schema.Types.Boolean,
      default: false,
    },
    isOnline: {
      type: Schema.Types.Boolean,
      default: false,
    },
    refreshToken: {
      type: Schema.Types.String,
    },
  },
  {
    timestamps: true,
  }
);

const UserSchema: Model<IUser> = mongoose.model<IUser>("Users", userSchema);
export default UserSchema;
