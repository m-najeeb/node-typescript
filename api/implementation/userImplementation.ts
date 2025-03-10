import bcrypt from "bcrypt";
import UserQueries from "../../src/queries/userQueries";
import ResponseService from "../../src/services/responseService";
import { STATUS, CODE } from "../../src/utilities/constants";
import { MESSAGES } from "../../src/utilities/messages";
import userQueries from "../../src/queries/userQueries";

import {
  SignUpData,
  SignInData,
  EditProfileData,
  ChangePasswordData,
} from "../../src/interfaces/UserData";

class UserImplementation {
  async signUp(data: SignUpData) {
    try {
      const { username, email, phone } = data;
      const errorMessages: string[] = [];

      const existingUser = await UserQueries.getUserDetailsByData(data);

      if (existingUser) {
        if (existingUser.username === username)
          errorMessages.push(MESSAGES.USERNAME_EXISTS);
        if (existingUser.email === email)
          errorMessages.push(MESSAGES.EMAIL_EXISTS);
        if (existingUser.phone === phone)
          errorMessages.push(MESSAGES.PHONE_EXISTS);
      }

      if (errorMessages.length > 0) {
        ResponseService.status = CODE.BAD_REQUEST;
        return ResponseService.responseService(STATUS.ERROR, [], errorMessages);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
      data.password = hashedPassword;

      const response = await UserQueries.createUser(data);

      if (response) {
        ResponseService.status = CODE.CREATED;
        return ResponseService.responseService(
          STATUS.SUCCESS,
          response,
          MESSAGES.SUCCESSFULLY_SIGN_UP
        );
      }
    } catch (error: any) {
      ResponseService.status = CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        STATUS.EXCEPTION,
        error.message,
        MESSAGES.EXCEPTION
      );
    }
  }

  async signIn(data: SignInData) {
    try {
      const user = await UserQueries.getUserByEmail(data.email);

      if (!user) {
        ResponseService.status = CODE.RECORD_NOT_FOUND;
        return ResponseService.responseService(
          STATUS.ERROR,
          [],
          MESSAGES.USER_NOT_FOUND
        );
      }

      const isMatch = await bcrypt.compare(data.password, user.password ?? "");

      if (!isMatch) {
        ResponseService.status = CODE.BAD_REQUEST;
        return ResponseService.responseService(
          STATUS.ERROR,
          [],
          MESSAGES.INVALID_CREDENTIALS
        );
      }

      user.isOnline = true;
      await user.save();

      ResponseService.status = CODE.OK;
      return ResponseService.responseService(
        STATUS.SUCCESS,
        { user: user },
        MESSAGES.RECORD_FOUND
      );
    } catch (error: any) {
      ResponseService.status = CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        STATUS.EXCEPTION,
        error.message,
        MESSAGES.EXCEPTION
      );
    }
  }
  async editProfile(data: EditProfileData) {
    try {
      const id = data.id;
      const user = await userQueries.getUserById(id);
      if (!user) {
        ResponseService.status = CODE.RECORD_NOT_FOUND;
        return ResponseService.responseService(
          STATUS.NOT_FOUND,
          [],
          MESSAGES.USER_NOT_FOUND
        );
      }

      if (data.profilePicture) user.profilePicture = data.profilePicture;
      if (data.fullName) user.fullName = data.fullName;
      if (data.phone) user.phone = data.phone;
      if (data.country) user.country = data.country;

      const response = await user.save();
      ResponseService.status = CODE.OK;
      if (response) {
        return ResponseService.responseService(
          STATUS.SUCCESS,
          response,
          MESSAGES.PROFILE_UPDATED
        );
      }
    } catch (error: any) {
      ResponseService.status = CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        STATUS.EXCEPTION,
        error.message,
        MESSAGES.EXCEPTION
      );
    }
  }
  async changePassword(data: ChangePasswordData) {
    try {
      const { email, currentPassword, newPassword } = data;
      const user = await userQueries.getUserByEmail(email);
      if (!user) {
        ResponseService.status = CODE.RECORD_NOT_FOUND;
        return ResponseService.responseService(
          STATUS.ERROR,
          [],
          MESSAGES.EMAIL_NOT_FOUND
        );
      }
      const isPasswordMatch = await bcrypt.compare(
        currentPassword,
        user.password ?? ""
      );

      if (!isPasswordMatch) {
        ResponseService.status = CODE.NOT_ACCEPTED;
        return ResponseService.responseService(
          STATUS.ERROR,
          [],
          MESSAGES.PASSWORD_MISMATCH
        );
      }

      const isNewPasswordSame = await bcrypt.compare(
        newPassword,
        user.password ?? ""
      );

      if (isNewPasswordSame) {
        ResponseService.status = CODE.NOT_ACCEPTED;
        return ResponseService.responseService(
          STATUS.ERROR,
          [],
          MESSAGES.PASSWORD_SAME_AS_OLD
        );
      }

      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);
      const response = await UserQueries.updateUserPassword(
        email,
        hashedNewPassword
      );

      ResponseService.status = CODE.OK;
      return ResponseService.responseService(
        STATUS.SUCCESS,
        response,
        MESSAGES.PASSWORD_UPDATED
      );
    } catch (error: any) {
      ResponseService.status = CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        STATUS.EXCEPTION,
        error.message,
        MESSAGES.EXCEPTION
      );
    }
  }
}

export default new UserImplementation();
