import { Types } from "mongoose";
import { UserModel } from "../../Model/Index";
import IUserRole from "../../Interface/userRole.Interface";

export const getAllUserService = async () => {
  const users = await UserModel.aggregate([
    {
      $match: {
        isActive: { $eq: true },
        isDeleted: { $eq: false },
      },
    },
    {
      $project: {
        password: 0,
        isActive: 0,
        isDeleted: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    },
    {
      $lookup: {
        from: "roles",
        localField: "role",
        foreignField: "_id",
        as: "role",
        pipeline: [
          {
            $match: {
              isActive: { $eq: true },
              isDeleted: { $eq: false },
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$role",
      },
    },
    {
      $addFields: {
        role: "$role.name",
      },
    },
  ]);
  return users;
};

export const getSingleUserService = async (userId: Types.ObjectId) => {
  console.log(userId)
  const user = await UserModel.aggregate([
    {
      $match: {
        _id: { $eq: new Types.ObjectId(userId) },
        isActive: true,
        isDeleted: false,
      },
    },
    {
      $project: {
        password: 0,
        isActive: 0,
        isDeleted: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    },
    {
      $lookup: {
        from: "roles",
        localField: "role",
        foreignField: "_id",
        as: "role",
        pipeline: [
          {
            $match: {
              isActive: true,
              isDeleted: false,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$role",
      },
    },
    {
      $addFields: {
        role: "$role.name",
      },
    },
  ]);
  console.log(user)
  return user;
};

export const getUserById_Without_Lookup_Service = (userId: Types.ObjectId) => {
  const user = UserModel.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(userId),
      },
    },
    {
      $project: {
        role: 1,
        email: 1,
        username: 1,
        lastName: 1,
        firstName: 1,
        dateOfBirth: 1,
      },
    },
  ]);
  return user;
};

export const getTheRoleByUserIdService = async (
  userId: Types.ObjectId
): Promise<IUserRole | null> => {
  const roles = await UserModel.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(userId),
        isActive: true,
        isDeleted: false,
      },
    },
    {
      $project: {
        role: 1,
      },
    },
  ]);

  return roles[0];
};
