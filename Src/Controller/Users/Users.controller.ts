import { Types } from "mongoose";
import ResponseMessage from "../../Constants/ResponseMessage";
import StatusCodes from "../../Constants/StatusCodes";
import { expressRequest, expressResponse } from "../../Dependencies";
import { errorResponse, successResponse } from "../../Helper/Response.helper";
import {
  getAllUserService,
  getSingleUserService,
} from "../../Service/Users/Users.Service";

export const getAllUsersController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const users = await getAllUserService();
  return successResponse(res, {
    message: ResponseMessage.SUCCESS,
    data: users,
  });
};

export const getUserByUserIdController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { userId } = req.params;
  const user = await getSingleUserService(new Types.ObjectId(userId));
  if (user.length == 0) {
    return errorResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      message: ResponseMessage.NO_USER_FOUND,
      errors: {},
    });
  }
  return successResponse(res, { message: ResponseMessage.SUCCESS, data: user });
};
