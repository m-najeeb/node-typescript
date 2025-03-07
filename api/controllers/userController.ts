import { Request, Response } from "express";
import ResponseService from "../../src/services/responseService";
import { STATUS, CODE } from "../../src/utilities/constants";
import { MESSAGES } from "../../src/utilities/messages";
import userValidation from "../../src/validations/userValidations";
import userImplementation from "../implementation/userImplementation";

class UserController {
  async signUp(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const { error, value } = userValidation.signUp(data);

      if (error) {
        ResponseService.status = CODE.BAD_REQUEST;
        res
          .status(ResponseService.status)
          .send(
            ResponseService.responseService(
              STATUS.ERROR,
              error.details[0].message,
              MESSAGES.INVALID_DATA
            )
          );
        return;
      }

      const response = await userImplementation.signUp(value);
      res.status(ResponseService.status).send(response);
    } catch (error: any) {
      ResponseService.status = CODE.INTERNAL_SERVER_ERROR;
      res
        .status(ResponseService.status)
        .send(
          ResponseService.responseService(
            STATUS.EXCEPTION,
            error.message,
            MESSAGES.EXCEPTION
          )
        );
    }
  }

  async signIn(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const { error, value } = userValidation.signIn(data);

      if (error) {
        ResponseService.status = CODE.BAD_REQUEST;
        res
          .status(ResponseService.status)
          .send(
            ResponseService.responseService(
              STATUS.ERROR,
              error.details[0].message,
              MESSAGES.INVALID_DATA
            )
          );
        return;
      }

      const response = await userImplementation.signIn(value);
      res.status(ResponseService.status).send(response);
    } catch (error: any) {
      ResponseService.status = CODE.INTERNAL_SERVER_ERROR;
      res
        .status(ResponseService.status)
        .send(
          ResponseService.responseService(
            STATUS.EXCEPTION,
            error.message,
            MESSAGES.EXCEPTION
          )
        );
    }
  }

  async editProfile(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const { error, value } = userValidation.editProfile(data);
      if (error) {
        ResponseService.status = CODE.BAD_REQUEST;
        res
          .status(ResponseService.status)
          .send(
            ResponseService.responseService(
              STATUS.ERROR,
              error.details[0].message,
              MESSAGES.INVALID_DATA
            )
          );
      }

      const response = await userImplementation.editProfile(value);
      res.status(ResponseService.status).send(response);
    } catch (error: any) {
      ResponseService.status = CODE.INTERNAL_SERVER_ERROR;
      res
        .status(ResponseService.status)
        .send(
          ResponseService.responseService(
            STATUS.EXCEPTION,
            error.message,
            MESSAGES.EXCEPTION
          )
        );
    }
  }
}

export default new UserController();
