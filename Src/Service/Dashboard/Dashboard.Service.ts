import { Types } from "mongoose";
import { PermissionModel } from "../../Model/Index";
import DashboardModel from "../../Model/Dashboard/Dashboard.Model";

export const createDashboardPropertyService = async (
  name: string,
  role: Types.ObjectId[]
) => {
  // *Create a Default Permission and get its _id
  const { _id: permissionId } =
    await createDashboard_Property_Permission_Service();

  // * create dashboard property
  const property = await DashboardModel.create({ name, role, permissionId });
  return property;
};

export const createDashboard_Property_Permission_Service = async () => {
  const permission = await PermissionModel.create({});
  return permission;
};

export const updateDashBoardPropertyService = async (
  name: string,
  role: Types.ObjectId[],
  propertyId: Types.ObjectId
) => {
  const updatedProperty = await DashboardModel.findOneAndUpdate(
    { _id: { $eq: new Types.ObjectId(propertyId) } },
    { $set: { name, role } },
    { new: true }
  );

  return updatedProperty;
};

export const getPropertyByPropertyIdService = async (
  propertyId: Types.ObjectId
) => {
  const property = await DashboardModel.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(propertyId),
        isActive: true,
        isDeleted: false,
      },
    },
    {
      $lookup: {
        from: "permissions",
        localField: "permissionId",
        foreignField: "_id",
        as: "permissionId",
        pipeline: [
          {
            $match: {
              isActive: true,
              isDeleted: false,
            },
          },
          {
            $project: {
              isActive: 0,
              isDeleted: 0,
              createdAt: 0,
              updatedAt: 0,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$permissionId",
      },
    },
    {
      $project: {
        isActive: 0,
        isDeleted: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    },
  ]);
  return property;
};

export const getAllDashboardPropertiesService = async () => {
  const property = await DashboardModel.aggregate([
    {
      $match: {
        isActive: true,
        isDeleted: false,
      },
    },
    {
      $lookup: {
        from: "permissions",
        localField: "permissionId",
        foreignField: "_id",
        as: "permissionId",
        pipeline: [
          {
            $match: {
              isActive: true,
              isDeleted: false,
            },
          },
          {
            $project: {
              isActive: 0,
              isDeleted: 0,
              createdAt: 0,
              updatedAt: 0,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$permissionId",
      },
    },
    {
      $project: {
        isActive: 0,
        isDeleted: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    },
  ]);
  return property;
};
