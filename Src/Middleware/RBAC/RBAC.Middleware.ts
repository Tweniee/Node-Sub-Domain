import { Types } from "mongoose";
import {
  expressNextFunction,
  expressResponse,
  expressRequest,
} from "../../Dependencies";
import { getSingleUserService } from "../../Service/Users/Users.Service";

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
    console.log(userRole);
    if (isAuthorized(userRole[0].name, allowedRoles)) {
      next(); // The user is authorized, continue with the next middleware function
    } else {
      res.status(403).send("Forbidden"); // The user is not authorized, send a 403 Forbidden response
    }
  };
}
