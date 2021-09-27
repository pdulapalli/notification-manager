import { ErrorMessage } from "../typedefs/enums/errorMessage.enum";

function deduceHttpStatusFromMsg(msg: ErrorMessage | string) {
  switch (msg) {
    case ErrorMessage.INVALID_INPUT:
      return 400;
    case ErrorMessage.USER_NOT_FOUND:
      return 404;
    default:
      return 500;
  }
}

export { deduceHttpStatusFromMsg };
