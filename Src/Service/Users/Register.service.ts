import { expressRequest, expressResponse } from "../../Dependencies/index";
import { hashPassword } from "../../Middleware/Password/passwordMiddleware";
import { UserModel } from "../../Model/Index";
import { searchRoleByRoleName } from "../Roles/Role.service";
import { createNewTemplateContentService } from "../Template/NewTemplate/TemplateContent.Service";

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
    availableDays,
    sessionEndTime,
    sessionStartTime,
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
    availableDays,
    sessionEndTime,
    sessionStartTime,
    phoneNumber,
  });
  await createNewTemplateContentService(user._id);
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
