import { StatusType, CodeType, STATUS, CODE } from "../utilities/constants";
import { MessageType, MESSAGES } from "../utilities/messages";
import { ResponseObject } from "../interfaces/ResponseObject";

class ResponseService {
  static status: CodeType;

  static responseService<T>(
    state: StatusType,
    responseData: T,
    message: string | string[] | MessageType | MessageType[]
  ): ResponseObject<T> {
    let responseObj: ResponseObject<T>;

    responseObj = {
      metadata: {
        status: state,
        message: message,
        responseCode: this.status,
      },
      payload: {
        data: responseData,
      },
    };

    return responseObj;
  }

  static success<T>(data: T, message: MessageType | string): ResponseObject<T> {
    this.status = CODE.OK;
    return this.responseService(STATUS.SUCCESS, data, message);
  }

  static error<T>(
    data: T,
    message: string | string[] | MessageType | MessageType[],
    code: CodeType = CODE.BAD_REQUEST
  ): ResponseObject<T> {
    this.status = code;
    return this.responseService(STATUS.ERROR, data, message);
  }

  static exception<T>(error: any): ResponseObject<T> {
    this.status = CODE.INTERNAL_SERVER_ERROR;
    return this.responseService(
      STATUS.EXCEPTION,
      error.message,
      MESSAGES.EXCEPTION
    );
  }
}

export default ResponseService;
