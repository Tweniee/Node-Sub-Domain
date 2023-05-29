import ResponseMessage from "../../Constants/ResponseMessage";
import StatusCodes from "../../Constants/StatusCodes";
import { expressRequest, expressResponse } from "../../Dependencies/index";
import { errorResponse, successResponse } from "../../Helper/Response.helper";
import { IUser } from "../../Model/Users/UserSIgnup.Model";
import {
  checkUsernameService,
  registerService,
} from "../../Service/Users/Register.service";
import {
  isUserEmailAlreadyExistService,
  isUserNumberAlreadyExistService,
} from "../../Service/Users/User.service";

export const RegisterController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { phoneNumber, email, username } = req.body;

  //*checking if email already exists
  const isEmailExist: IUser[] = await isUserEmailAlreadyExistService(email);

  //*check if number already exists
  const isNumberExist: IUser[] = await isUserNumberAlreadyExistService(
    phoneNumber
  );

  const isUsername = await checkUsernameService(username);

  //* return error if email is available
  if (isEmailExist.length > 0) {
    return errorResponse(res, {
      statusCode: StatusCodes.FORBIDDEN,
      message: ResponseMessage.EMAIL_ALREADY_EXIST,
      errors: {},
    });

    //* return error if number is available
  } else if (isNumberExist.length > 0) {
    return errorResponse(res, {
      statusCode: StatusCodes.FORBIDDEN,
      message: ResponseMessage.NUMBER_ALREADY_EXIST,
      errors: {},
    });
  } else if (isUsername.length > 0) {
    return errorResponse(res, {
      statusCode: StatusCodes.FORBIDDEN,
      message: ResponseMessage.USERNAME_ALREADY_EXISTS,
      errors: {},
    });
  }

  //*register new user
  const user = await registerService(req);

  //*success
  return successResponse(res, {
    message: ResponseMessage.SUCCESSFULLY_REGISTERED,
    data: user,
  });
};

export const checkUsernameController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { username } = req.body;

  //*checking is there username is available for taking
  const isValid = await checkUsernameService(username);

  //*if the username is already taken (case insensitive)
  if (isValid.length > 0) {
    return errorResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      message: ResponseMessage.USERNAME_ALREADY_EXISTS,
      errors: {},
    });
  }

  //*success
  return successResponse(res, {
    message: ResponseMessage.USERNAME_AVAILABLE,
    data: { validUsername: true },
  });
};
