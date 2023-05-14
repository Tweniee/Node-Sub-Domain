import ResponseMessage from "../../Constants/ResponseMessage";
import StatusCodes from "../../Constants/StatusCodes";
import { expressRequest, expressResponse } from "../../Dependencies";
import { errorResponse, successResponse } from "../../Helper/Response.helper";
import {
  checkToDeleteService,
  clientServiceDeleteService,
  createClientEnquiryService,
  getAllRequestedService_Service,
  getSingleService_Service,
} from "../../Service/Client/Client.Service";

export const clientRequestServiceController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const {
    dietitian,
    goal,
    name,
    age,
    gender,
    activityLevel,
    height,
    weight,
    medicalConditions = [],
    allergies = [],
  } = req.body;
  const client = req.userId;
  const clientEnquiry = await createClientEnquiryService({
    client,
    dietitian,
    goal,
    name,
    age,
    gender,
    activityLevel,
    height,
    weight,
    medicalConditions,
    allergies,
  });
  return successResponse(res, {
    message: ResponseMessage.CLIENT_REQUEST_CREATED_SUCCESSFULLY,
    data: clientEnquiry,
  });
};

export const clientServiceDeleteController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { serviceId } = req.params;
  const isValid = await checkToDeleteService(serviceId);
  if (isValid.length == 0) {
    return errorResponse(res, {
      statusCode: StatusCodes.FORBIDDEN,
      message: ResponseMessage.CANNOT_DELETE_NOW,
      errors: {},
    });
  }
  const deletedService = await clientServiceDeleteService(serviceId);
  return successResponse(res, {
    message: ResponseMessage.SERVICE_DELETED,
    data: deletedService,
  });
};

export const getAllRequestedServiceController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const userId = req.userId;
  const getAllRequestedService = await getAllRequestedService_Service(userId);
  return successResponse(res, {
    message: ResponseMessage.SUCCESS,
    data: getAllRequestedService,
  });
};

export const getAllReceivedServiceController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const userId = req.userId;
  const getAllRequestedService = await getAllRequestedService_Service(userId);
  return successResponse(res, {
    message: ResponseMessage.SUCCESS,
    data: getAllRequestedService,
  });
};

export const getSingleRequestedServiceController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const {serviceId}= req.params
    const service = await getSingleService_Service(serviceId);
    return successResponse(res, {
      message: ResponseMessage.SUCCESS,
      data: service,
    });
}