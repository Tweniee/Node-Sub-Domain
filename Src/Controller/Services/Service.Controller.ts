import ResponseMessage from "../../Constants/ResponseMessage";
import StatusCodes from "../../Constants/StatusCodes";
import { expressRequest, expressResponse } from "../../Dependencies";
import { errorResponse, successResponse } from "../../Helper/Response.helper";
import {
  getAllServicesService,
  getServiceByServiceIdService,
  getServiceByServiceName,
  serviceCreateService,
  serviceUpdateService,
} from "../../Service/Services/Services.Service";

// * A Super Admin will create service that out portal will provide
// * Dietitian then can select these service and provide services
export const createServiceController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { name, description } = req.body;
  const service = await serviceCreateService(name, description);
  if (!service) {
    return errorResponse(res, {
      statusCode: StatusCodes.CONFLICT,
      message: ResponseMessage.SERVICE_ALREADY_EXISTS,
      errors: {},
    });
  }
  return successResponse(res, {
    message: ResponseMessage.SERVICE_CREATED_SUCCESSFULLY,
    data: service,
  });
};

// * A Super Admin will update a service that out portal is providing
// * Dietitian then can select these service and provide services
export const updateServiceController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { name, description, serviceId } = req.body;
  const service = await serviceUpdateService(name, description, serviceId);
  if (!service) {
    return errorResponse(res, {
      statusCode: StatusCodes.CONFLICT,
      message: ResponseMessage.SERVICE_NOT_FOUND,
      errors: {},
    });
  }
  return successResponse(res, {
    message: ResponseMessage.SERVICE_UPDATED_SUCCESSFULLY,
    data: service,
  });
};

// * All users will be able to get all services that our portal offers
export const getAllServiceController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const service = await getAllServicesService();
  return successResponse(res, {
    message: ResponseMessage.SUCCESS,
    data: service,
  });
};

// * All users will be able to get Single service by there ID
export const getServiceByIdController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { serviceId } = req.params;
  const service = await getServiceByServiceIdService(serviceId);
  return successResponse(res, {
    message: ResponseMessage.SUCCESS,
    data: service,
  });
};

// * Search Service that are available
export const searchServiceController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { name } = req.body;
  const service = await getServiceByServiceName(name);
  return successResponse(res, {
    message: ResponseMessage.SEARCHED_RESULT,
    data: service,
  });
};
