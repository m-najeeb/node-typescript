import Joi from "joi";
import { PASSWORD } from "../utilities/constants";

// Define interfaces for each validation schema's input
interface SignUpData {
  profilePicture?: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  country?: string;
  password: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface EditProfileData {
  id: string;
  profilePicture?: string;
  fullName?: string;
  phone?: string;
  country?: string;
}

interface ChangePasswordData {
  email: string;
  currentPassword: string;
  newPassword: string;
}

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
