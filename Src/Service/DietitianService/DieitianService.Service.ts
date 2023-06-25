import { Types } from "mongoose";
import {
  DietitianServiceInterface,
  UpdateDietitianServiceInterface,
} from "../../Interface/DietitianService.interface";
import { DietitianServiceModel } from "../../Model/Index";

// * Create Single Service
export const createDietitianService_Service = async (
  body: DietitianServiceInterface
) => {
  const dietitianService = await DietitianServiceModel.create(body);
  return dietitianService;
};

// * Update Single Service
export const updateDietitianService_Service = async (
  body: UpdateDietitianServiceInterface,
  dietitian: string
) => {
  const {
    serviceId,
    description,
    price,
    durationInMinutes,
    numberOfSessionPerWeek,
    totalWeekForSession,
  } = body;
  const dietitianService = await getSingleDietitianService_Service(
    serviceId,
    dietitian
  );
  if (dietitianService.length == 0) {
    return false;
  }
  const updatedDietitianService = await DietitianServiceModel.findOneAndUpdate(
    { _id: new Types.ObjectId(serviceId) },
    {
      $set: {
        description,
        price,
        durationInMinutes,
        numberOfSessionPerWeek,
        totalWeekForSession,
      },
    },
    { new: true }
  );
  return updatedDietitianService;
};

// * Delete Single Service
export const deleteDietitianService_Service = async (
  serviceId: Types.ObjectId,
  dietitian: string
) => {
  const dietitianService = await getSingleDietitianService_Service(
    serviceId,
    dietitian
  );
  if (dietitianService.length == 0) {
    return false;
  }
  const deletedDietitianService = await DietitianServiceModel.findOneAndUpdate(
    { _id: new Types.ObjectId(serviceId) },
    { $set: { isActive: false, isDeleted: true } },
    { new: true }
  );
  return deletedDietitianService;
};

// * Get All service of a dietitian Records
export const getAllDietitianService_Service = async (dietitian: string) => {
  const dietitianService = await DietitianServiceModel.aggregate([
    {
      $match: {
        isActive: true,
        isDeleted: false,
        dietitian: new Types.ObjectId(dietitian),
      },
    },
    {
      $lookup: {
        from: "services",
        localField: "serviceName",
        foreignField: "_id",
        as: "serviceName",
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
      $addFields: {
        userId: "$dietitian",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "dietitian",
        foreignField: "_id",
        as: "dietitian",
        pipeline: [
          {
            $match: {
              isActive: true,
              isDeleted: false,
            },
          },
          {
            $project: {
              role: 1,
              username: 1,
              lastName: 1,
              firstName: 1,
              dateOfBirth: 1,
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
        ],
      },
    },
    {
      $unwind: {
        path: "$dietitian",
      },
    },
    {
      $unwind: {
        path: "$serviceName",
      },
    },
    {
      $project: {
        isActive: 0,
        isDeleted: 0,
        createdAt: 0,
        updatedAt: 0,
        availableDays: 0,
      },
    },
  ]);
  return dietitianService;
};

// * Get Single Service
export const getSingleDietitianService_Service = async (
  serviceId: Types.ObjectId,
  dietitian: string
) => {
  const dietitianService = await DietitianServiceModel.aggregate([
    {
      $match: {
        isActive: true,
        isDeleted: false,
        dietitian: new Types.ObjectId(dietitian),
        _id: new Types.ObjectId(serviceId),
      },
    },
    {
      $lookup: {
        from: "services",
        localField: "serviceName",
        foreignField: "_id",
        as: "serviceName",
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
      $addFields: {
        userId: "$dietitian",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "dietitian",
        foreignField: "_id",
        as: "dietitian",
        pipeline: [
          {
            $match: {
              isActive: true,
              isDeleted: false,
            },
          },
          {
            $project: {
              role: 1,
              username: 1,
              lastName: 1,
              firstName: 1,
              dateOfBirth: 1,
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
        ],
      },
    },
    {
      $unwind: {
        path: "$dietitian",
      },
    },
    {
      $unwind: {
        path: "$serviceName",
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
  return dietitianService;
};

// * Get Single Service
export const getSingleDietitianServiceMainService = async (
  serviceId: Types.ObjectId
) => {
  const dietitianService = await DietitianServiceModel.aggregate([
    {
      $match: {
        isActive: true,
        isDeleted: false,
        _id: new Types.ObjectId(serviceId),
      },
    },
    {
      $lookup: {
        from: "services",
        localField: "serviceName",
        foreignField: "_id",
        as: "serviceName",
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
      $addFields: {
        userId: "$dietitian",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "dietitian",
        foreignField: "_id",
        as: "dietitian",
        pipeline: [
          {
            $match: {
              isActive: true,
              isDeleted: false,
            },
          },
          {
            $project: {
              role: 1,
              username: 1,
              lastName: 1,
              firstName: 1,
              dateOfBirth: 1,
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
        ],
      },
    },
    {
      $unwind: {
        path: "$dietitian",
      },
    },
    {
      $unwind: {
        path: "$serviceName",
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
  return dietitianService;
};
