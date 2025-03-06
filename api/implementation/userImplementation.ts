import bcrypt from "bcrypt";
import UserQueries from "../../src/queries/userQueries";
import ResponseService from "../../src/services/responseService";
import { STATUS, CODE } from "../../src/utilities/constants";
import { MESSAGES } from "../../src/utilities/messages";

interface SignUpData {
  username: string;
  email: string;
  phone: string;
  password: string;
  [key: string]: any;
}

interface SignInData {
  email: string;
  password: string;
}

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
}

export default new UserImplementation();
