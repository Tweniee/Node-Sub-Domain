import { Types } from "mongoose";
import { PermissionModel } from "../../Model/Index";
import DashboardModel from "../../Model/Dashboard/Dashboard.Model";
import IPermissionDashboard from "../../Interface/PermissionDashboard.interface";

export const createDashboardPropertyService = async (
  name: string,
  role: Types.ObjectId[],
  route: string,
  image: string
) => {
  // *Create a Default Permission and get its _id
  const { _id: permissionId } =
    await createDashboard_Property_Permission_Service();

  // * create dashboard property
  const property = await DashboardModel.create({
    name,
    role,
    permissionId,
    route,
    image,
  });
  return property;
};

export const createDashboard_Property_Permission_Service = async () => {
  const permission = await PermissionModel.create({});
  return permission;
};

export const updateDashBoardPropertyService = async (
  name: string,
  role: Types.ObjectId[],
  propertyId: Types.ObjectId,
  route: string,
  image: string
) => {
  const updatedProperty = await DashboardModel.findOneAndUpdate(
    { _id: { $eq: new Types.ObjectId(propertyId) } },
    { $set: { name, role, route, image } },
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

export const getAllPermissionService = async (
  role: Types.ObjectId,
  tab: string
): Promise<IPermissionDashboard | null | { permissionId: any }> => {
  const permission = await DashboardModel.aggregate([
    {
      $match: {
        _id: { $eq: new Types.ObjectId(tab) },
        role: {
          $in: [new Types.ObjectId(role)],
        },
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
        role: 0,
      },
    },
  ]);
  console.log(permission);
  if (permission.length == 0) {
    return { permissionId: null };
  }
  return permission[0];
};
