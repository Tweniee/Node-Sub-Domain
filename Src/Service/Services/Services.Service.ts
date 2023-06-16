import { Types } from "mongoose";
import { ServiceModel } from "../../Model/Index";

// * Create Service from super admin dashboard
export const serviceCreateService = async (
  name: string,
  description: string,
  image: string
) => {
  const service = await getServiceByServiceName(name);
  if (service.length > 0) {
    return false;
  }
  const createdService = await ServiceModel.create({
    name,
    description,
    image,
  });

  return createdService;
};

// * Get Service by Service Name
export const getServiceByServiceName = async (name: string) => {
  console.log("name,", name);
  const service = await ServiceModel.aggregate([
    {
      $match: {
        name: {
          $regex: "^" + name,
          $options: "i",
        },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        image: 1,
        description: 1,
      },
    },
  ]);
  return service;
};

// * Update Service By service ID
export const serviceUpdateService = async (
  name: string,
  description: string,
  serviceId: string,
  image: string
) => {
  const service = await getServiceByServiceIdService(serviceId);
  if (service.length == 0) {
    return false;
  }
  const updatedService = await ServiceModel.findOneAndUpdate(
    {
      _id: { $eq: new Types.ObjectId(serviceId) },
    },
    { $set: { name, description, image } },
    { new: true }
  );
  return updatedService;
};

// * get Service by service ID
export const getServiceByServiceIdService = async (serviceId: string) => {
  const service = await ServiceModel.aggregate([
    {
      $match: {
        _id: { $eq: new Types.ObjectId(serviceId) },
      },
    },

    {
      $project: {
        _id: 1,
        name: 1,
        image: 1,
        description: 1,
      },
    },
  ]);
  return service;
};

// * get All services
export const getAllServicesService = async () => {
  const service = await ServiceModel.aggregate([
    {
      $project: {
        _id: 1,
        name: 1,
        image: 1,
        description: 1,
      },
    },
  ]);
  return service;
};
