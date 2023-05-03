import { expressRequest, expressResponse } from "../Dependencies/index";
import { hashPassword } from "../Middleware/Password/passwordMiddleware";
import { UserModel } from "../Model/Index";
import { searchRoleByRoleName } from "./Roles/Role.service";

export const registerService = async (req: expressRequest): Promise<any> => {
  //* Extract user data from request body
  const {
    firstName,
    lastName,
    email,
    username,
    role,
    password,
    dateOfBirth,
    phoneNumber,
  } = req.body;
  const roleId = await searchRoleByRoleName(role);

  const user = await UserModel.create({
    firstName,
    lastName,
    username,
    email,
    role: roleId[0]._id,
    password: await hashPassword(password),
    dateOfBirth,
    phoneNumber,
  });
  return user;
};

export const checkUsernameService = async (username: string) => {
  const user = await UserModel.aggregate([
    {
      $match: { username: { $regex: `^${username}$`, $options: "i" } },
    },
  ]);
  return user;
};
