import { StatusType, CodeType } from "../utilities/constants";
import { MessageType } from "../utilities/messages";

export interface ResponseObject<T = any> {
  metadata: {
    status: StatusType;
    message: string | string[] | MessageType | MessageType[];
    responseCode: CodeType | undefined;
  };
  payload: {
    data: T;
  };
}
