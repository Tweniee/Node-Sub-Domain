import ResponseMessage from "../../Constants/ResponseMessage";
import StatusCodes from "../../Constants/StatusCodes";
import { expressRequest, expressResponse } from "../../Dependencies/index";
import { errorResponse, successResponse } from "../../Helper/Response.helper";
import { createJWTMiddleware } from "../../Middleware/Auth/authMiddleware";
import { comparePassword } from "../../Middleware/Password/passwordMiddleware";
import { IUser } from "../../Model/Users/UserSIgnup.Model";
import { isUserEmailAlreadyExistService } from "../../Service/User.service";

export const loginController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { email, password } = req.body;
  //*checking if email already exists
  const isEmailExist: IUser[] = await isUserEmailAlreadyExistService(
    email
  );

  //*return error if email is available
  if (isEmailExist.length == 0) {
    return errorResponse(res, {
      statusCode: StatusCodes.FORBIDDEN,
      message: ResponseMessage.EMAIL_DOES_NOT_EXIST,
      errors: {},
    });
  }
  //*check if the password is correct
  const isPasswordMatched = await comparePassword(
    password,
    isEmailExist[0].password
  );

  //*returning error if password doesn't match
  if (!isPasswordMatched) {
    return errorResponse(res, {
      statusCode: StatusCodes.FORBIDDEN,
      message: ResponseMessage.INCORRECT_PASSWORD,
      errors: {},
    });
  }

  //*success
  return successResponse(res, {
    message: ResponseMessage.USER_VERIFIED,
    data: { token: createJWTMiddleware(isEmailExist[0]._id) },
  });
};
