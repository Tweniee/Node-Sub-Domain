import { Types } from "mongoose";
import ResponseMessage from "../../Constants/ResponseMessage";
import { expressRequest, expressResponse } from "../../Dependencies";
import { errorResponse, successResponse } from "../../Helper/Response.helper";
import {
  createDietitianService_Service,
  deleteDietitianService_Service,
  getSingleDietitianService_Service,
  updateDietitianService_Service,
  getAllDietitianService_Service,
  getSingleDietitianServiceMainService,
} from "../../Service/DietitianService/DieitianService.Service";
import StatusCodes from "../../Constants/StatusCodes";

export const createDietitianServiceController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const {
    tabName,
    serviceName,
    description,
    price,
    durationInMinutes,
    availableDays,
  } = req.body;
  const dietitian = new Types.ObjectId(req.userId);
  const dietitianService = await createDietitianService_Service({
    serviceName,
    description,
    dietitian,
    tabName,
    price,
    durationInMinutes,
    availableDays,
  });
  return successResponse(res, {
    message: ResponseMessage.DIETITIAN_SERVICE_CREATED,
    data: dietitianService,
  });
};

export const getSingleDietitianServiceController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { serviceId = null } = req.params;
  if (!serviceId) {
    return errorResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      message: ResponseMessage.INVALID_PARAMS,
      errors: {},
    });
  }
  const dietitianService = await getSingleDietitianServiceMainService(
    new Types.ObjectId(serviceId)
  );
  return successResponse(res, {
    message: ResponseMessage.DIETITIAN_DATA,
    data: dietitianService,
  });
};
export const updateDietitianServiceController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const {
    serviceId = null,
    description,
    price,
    durationInMinutes,
    availableDays,
  } = req.body;
  if (!serviceId) {
    return errorResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      message: ResponseMessage.INVALID_PARAMS,
      errors: {},
    });
  }
  const dietitian = req.userId;
  const dietitianService = await updateDietitianService_Service(
    {
      serviceId,
      description,
      price,
      durationInMinutes,
      availableDays,
    },
    dietitian
  );
  if (!dietitianService) {
    return errorResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      message: ResponseMessage.INVALID_SERVICE_ID,
      errors: {},
    });
  }
  return successResponse(res, {
    message: ResponseMessage.DIETITIAN_SERVICE_UPDATED_SUCCESSFULLY,
    data: dietitianService,
  });
};
export const deleteDietitianServiceController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { serviceId = null } = req.params;
  if (!serviceId) {
    return errorResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      message: ResponseMessage.INVALID_PARAMS,
      errors: {},
    });
  }

  const dietitian = req.userId;
  const dietitianService = await deleteDietitianService_Service(
    new Types.ObjectId(serviceId),
    dietitian
  );
  if (!dietitianService) {
    return errorResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      message: ResponseMessage.INVALID_SERVICE_ID,
      errors: {},
    });
  }
  return successResponse(res, {
    message: ResponseMessage.DIETITIAN_SERVICE_DELETED,
    data: dietitianService,
  });
};
export const getAllDietitianServiceController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const dietitian = req.userId;
  const dietitianService = await getAllDietitianService_Service(dietitian);
  return successResponse(res, {
    message: ResponseMessage.SUCCESS,
    data: dietitianService,
  });
};
