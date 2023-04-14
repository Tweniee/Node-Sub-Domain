import StatusCodes from "../Constants/StatusCodes";
import { errorResponse } from "../Helper/Response.helper";
import ResponseMessage from "../Constants/ResponseMessage";
import { expressResponse } from "../Dependencies";

//* <---------------------------------------------Validator Error Message------------------------------------------>
export const validatorErrorMessage = (
  isValid: any,
  res: expressResponse
): expressResponse => {
  return errorResponse(res, {
    statusCode: StatusCodes.BAD_REQUEST,
    message: ResponseMessage.INVALID_PARAMS,
    errors: isValid.error.details[0].message,
  });
};
