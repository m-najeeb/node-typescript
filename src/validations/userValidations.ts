import Joi from "joi";
import { PASSWORD } from "../utilities/constants";
import {
  SignUpData,
  SignInData,
  EditProfileData,
  ChangePasswordData,
} from "../interfaces/UserData";

class UserValidation {
  signUp(userData: SignUpData) {
    const schema = Joi.object({
      profilePicture: Joi.string().uri().optional(),
      fullName: Joi.string().trim().max(55).required(),
      username: Joi.string().trim().max(55).required(),
      email: Joi.string().trim().email().required(),
      phone: Joi.string().trim().length(11).required(),
      country: Joi.string().trim().optional(),
      password: Joi.string().regex(PASSWORD.REGEX).required().messages({
        "string.pattern.base": PASSWORD.MESSAGE_FORMAT,
      }),
    });

    return schema.validate(userData, { abortEarly: false });
  }

  signIn(userData: SignInData) {
    const schema = Joi.object({
      email: Joi.string().trim().email().required(),
      password: Joi.string().required(),
    });

    return schema.validate(userData, { abortEarly: false });
  }

  editProfile(userData: EditProfileData) {
    const schema = Joi.object({
      id: Joi.string().required(),
      profilePicture: Joi.string().uri().optional(),
      fullName: Joi.string().trim().max(55).optional(),
      phone: Joi.string().trim().length(11).optional(),
      country: Joi.string().trim().optional(),
    });
    return schema.validate(userData, { abortEarly: false });
  }

  changePassword(userData: ChangePasswordData) {
    const schema = Joi.object({
      email: Joi.string().trim().email().required(),
      currentPassword: Joi.string().required(),
      newPassword: Joi.string().regex(PASSWORD.REGEX).required().messages({
        "string.pattern.base": PASSWORD.MESSAGE_FORMAT,
      }),
    });
    return schema.validate(userData, { abortEarly: false });
  }
}

export default new UserValidation();
