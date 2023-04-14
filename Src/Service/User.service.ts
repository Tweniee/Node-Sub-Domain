import { UserModel } from "../Model/Index";
import { IUser } from "../Model/Users/UserSIgnup.Model";

export const isUserEmailAlreadyExistService = async (
  email: string
): Promise<IUser[]> => {
  const user = await UserModel.aggregate([
    {
      $match: {
        email: { $eq: email },
      },
    },
  ]);
  return user;
};

export const isUserNumberAlreadyExistService = async (
  phoneNumber: string
): Promise<IUser[]> => {
  const user = await UserModel.aggregate([
    {
      $match: {
        phoneNumber: { $eq: phoneNumber },
      },
    },
  ]);
  return user;
};
