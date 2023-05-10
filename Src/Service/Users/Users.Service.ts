import { Types } from "mongoose";
import { UserModel } from "../../Model/Index";

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
  const user = await UserModel.aggregate([
    {
      $match: {
        _id: { $eq: userId },
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
  return user
};
