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
import { checkForPermissionService } from "../../Helper/Permissions/Permissions.Helper";
import UniqueValues from "../../Constants/UniqueValues";

export const createDietitianServiceController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { tabName } = req.body;
  // *getting this userId from token
  const userId = new Types.ObjectId(req?.userId);
  const hasPermission = await checkForPermissionService(
    tabName,
    userId,
    UniqueValues.CREATE_PERMISSION
  );
  if (!hasPermission) {
    return errorResponse(res, {
      statusCode: StatusCodes.UNAUTHORIZED,
      message: ResponseMessage.INVALID_ACTION,
      errors: {},
    });
  }
  const {
    serviceName,
    description,
    price,
    durationInMinutes,
    numberOfSessionPerWeek,
    totalWeekForSession,
  } = req.body;
  const dietitian = new Types.ObjectId(req.userId);
  const dietitianService = await createDietitianService_Service({
    serviceName,
    description,
    dietitian,
    tabName,
    price,
    durationInMinutes,
    numberOfSessionPerWeek,
    totalWeekForSession,
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
  const { tabName } = req.query;
  // *getting this userId from token
  const userId = new Types.ObjectId(req?.userId);
  const hasPermission = await checkForPermissionService(
    String(tabName),
    userId,
    UniqueValues.READ_PERMISSION
  );
  if (!hasPermission) {
    return errorResponse(res, {
      statusCode: StatusCodes.UNAUTHORIZED,
      message: ResponseMessage.INVALID_ACTION,
      errors: {},
    });
  }
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
  const { tabName } = req.body;
  // *getting this userId from token
  const userId = new Types.ObjectId(req?.userId);
  const hasPermission = await checkForPermissionService(
    tabName,
    userId,
    UniqueValues.UPDATE_PERMISSION
  );
  if (!hasPermission) {
    return errorResponse(res, {
      statusCode: StatusCodes.UNAUTHORIZED,
      message: ResponseMessage.INVALID_ACTION,
      errors: {},
    });
  }
  const {
    serviceId = null,
    description,
    price,
    durationInMinutes,
    numberOfSessionPerWeek,
    totalWeekForSession,
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
      numberOfSessionPerWeek,
      totalWeekForSession,
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
  const { tabName } = req.query;
  // *getting this userId from token
  const userId = new Types.ObjectId(req?.userId);
  const hasPermission = await checkForPermissionService(
    String(tabName),
    userId,
    UniqueValues.CREATE_PERMISSION
  );
  if (!hasPermission) {
    return errorResponse(res, {
      statusCode: StatusCodes.UNAUTHORIZED,
      message: ResponseMessage.INVALID_ACTION,
      errors: {},
    });
  }
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
  const { tabName } = req.query;
  // *getting this userId from token
  const userId = new Types.ObjectId(req?.userId);
  const hasPermission = await checkForPermissionService(
    String(tabName),
    userId,
    UniqueValues.READ_PERMISSION
  );
  if (!hasPermission) {
    return errorResponse(res, {
      statusCode: StatusCodes.UNAUTHORIZED,
      message: ResponseMessage.INVALID_ACTION,
      errors: {},
    });
  }
  const dietitian = req.userId;
  const dietitianService = await getAllDietitianService_Service(dietitian);
  return successResponse(res, {
    message: ResponseMessage.SUCCESS,
    data: dietitianService,
  });
};
