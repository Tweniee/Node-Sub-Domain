import { Types } from "mongoose";
import UniqueValues from "../../Constants/UniqueValues";
import { IClientInterface } from "../../Interface/Client.Interface";
import { IClient } from "../../Model/Clients/Clients.model";
import { ClientServiceStatusModel, ClientsModel } from "../../Model/Index";

export const createClientEnquiryService = async (body: IClientInterface) => {
  const clientService = await ClientsModel.create(body);
  await createClientServiceStatus(clientService);
  return clientService;
};

const createClientServiceStatus = async (body: IClient) => {
  const {
    _id: client_id,
    client: clientUserId,
    dietitian: dietitianUserId,
    goal: service_id,
  } = body;
  const subscription = UniqueValues.ACTIVE;
  const clientServiceStatus = await ClientServiceStatusModel.create({
    client_id,
    clientUserId,
    dietitianUserId,
    service_id,
    subscription,
  });
  return clientServiceStatus;
};

export const clientServiceDeleteService = async (serviceId: string) => {
  const deletedService = await ClientsModel.findOneAndUpdate(
    { _id: new Types.ObjectId(serviceId) },
    { $set: { isDeleted: true, isActive: false } },
    { new: true }
  );
  await deleteServiceStatusService(serviceId);
  return deletedService;
};

const deleteServiceStatusService = async (serviceId: string) => {
  const deleteServiceStatus = await ClientServiceStatusModel.findOneAndUpdate(
    { client_id: new Types.ObjectId(serviceId) },
    { $set: { isDeleted: true, isActive: false } },
    { new: true }
  );
  return deleteServiceStatus;
};

export const checkToDeleteService = async (serviceId: string) => {
  const clientServiceStatus = await ClientServiceStatusModel.find({
    $and: [
      { client_id: new Types.ObjectId(serviceId) },
      { subscription: { $eq: UniqueValues.ACTIVE } },
      {
        isActive: true,
      },
      {
        isDeleted: false,
      },
    ],
  });
  return clientServiceStatus;
};

export const getAllRequestedService_Service = async (userId: string) => {
  const allData = await ClientServiceStatusModel.aggregate([
    {
      $match: {
        clientUserId: { $eq: new Types.ObjectId(userId) },
        isActive: true,
        isDeleted: false,
      },
    },
    {
      $lookup: {
        from: "clients",
        localField: "client_id",
        foreignField: "_id",
        as: "clientDetails",
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
        path: "$clientDetails",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "clientUserId",
        foreignField: "_id",
        as: "user",
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
              email: 1,
              lastName: 1,
              firstName: 1,
              dateOfBirth: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$user",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "dietitianUserId",
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
              email: 1,
              lastName: 1,
              firstName: 1,
              dateOfBirth: 1,
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
      $lookup: {
        from: "services",
        localField: "service_id",
        foreignField: "_id",
        as: "service",
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
        path: "$service",
      },
    },
    {
      $project: {
        clientDetails: 1,
        user: 1,
        dietitian: 1,
        service: 1,
        subscription: 1,
      },
    },
  ]);
  return allData;
};

export const getAllReceivedService_Service = async (userId: string) => {
  const allData = await ClientServiceStatusModel.aggregate([
    {
      $match: {
        dietitianUserId: { $eq: new Types.ObjectId(userId) },
        isActive: true,
        isDeleted: false,
      },
    },
    {
      $lookup: {
        from: "clients",
        localField: "client_id",
        foreignField: "_id",
        as: "clientDetails",
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
        path: "$clientDetails",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "clientUserId",
        foreignField: "_id",
        as: "user",
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
              email: 1,
              lastName: 1,
              firstName: 1,
              dateOfBirth: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$user",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "dietitianUserId",
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
              email: 1,
              lastName: 1,
              firstName: 1,
              dateOfBirth: 1,
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
      $lookup: {
        from: "services",
        localField: "service_id",
        foreignField: "_id",
        as: "service",
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
        path: "$service",
      },
    },
    {
      $project: {
        clientDetails: 1,
        user: 1,
        dietitian: 1,
        service: 1,
        subscription: 1,
      },
    },
  ]);
  return allData;
};

export const getSingleService_Service = async (serviceId: string) => {
  const service = await await ClientServiceStatusModel.aggregate([
    {
      $match: {
        client_id: { $eq: new Types.ObjectId(serviceId) },
        isActive: true,
        isDeleted: false,
      },
    },
    {
      $lookup: {
        from: "clients",
        localField: "client_id",
        foreignField: "_id",
        as: "clientDetails",
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
        path: "$clientDetails",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "clientUserId",
        foreignField: "_id",
        as: "user",
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
              email: 1,
              lastName: 1,
              firstName: 1,
              dateOfBirth: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$user",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "dietitianUserId",
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
              email: 1,
              lastName: 1,
              firstName: 1,
              dateOfBirth: 1,
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
      $lookup: {
        from: "services",
        localField: "service_id",
        foreignField: "_id",
        as: "service",
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
        path: "$service",
      },
    },
    {
      $project: {
        clientDetails: 1,
        user: 1,
        dietitian: 1,
        service: 1,
        subscription: 1,
      },
    },
  ]);
  return service;
};
