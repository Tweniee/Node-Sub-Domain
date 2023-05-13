import { Types } from "mongoose";
import {
  expressNextFunction,
  expressResponse,
  expressRequest,
} from "../../Dependencies";
import { getSingleUserService } from "../../Service/Users/Users.Service";
import { errorResponse } from "../../Helper/Response.helper";
import StatusCodes from "../../Constants/StatusCodes";
import ResponseMessage from "../../Constants/ResponseMessage";

type Role = "Super Admin" | "Site Admin" | "Client" | "Dietitian";

function isAuthorized(userRole: Role, allowedRoles: string[]): boolean {
  return allowedRoles.includes(userRole);
}

export function authorize(allowedRoles: string[]) {
  return async (
    req: expressRequest,
    res: expressResponse,
    next: expressNextFunction
  ) => {
    const { userId } = req;
    const user = await getSingleUserService(new Types.ObjectId(userId));
    const role = user[0].role;
    const userRole: any = role;
    if (isAuthorized(userRole, allowedRoles)) {
      next(); // The user is authorized, continue with the next middleware function
    } else {
      errorResponse(res, {
        statusCode: StatusCodes.FORBIDDEN,
        message: ResponseMessage.INVALID_ROLE,
        errors: ResponseMessage.FORBIDDEN,
      }); // The user is not authorized, send a 403 Forbidden response
    }
  };
}
