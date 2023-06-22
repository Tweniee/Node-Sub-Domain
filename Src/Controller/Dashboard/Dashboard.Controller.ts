import { Types } from "mongoose";
import ResponseMessage from "../../Constants/ResponseMessage";
import StatusCodes from "../../Constants/StatusCodes";
import { expressRequest, expressResponse } from "../../Dependencies";
import { errorResponse, successResponse } from "../../Helper/Response.helper";
import {
  createDashboardPropertyService,
  getAllDashboardPropertiesService,
  getPropertyByPropertyIdService,
  updateDashBoardPropertyService,
} from "../../Service/Dashboard/Dashboard.Service";

export const createDashboardPropertyController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { name, role, route, image } = req.body;
  const dashboard = await createDashboardPropertyService(
    name,
    role,
    route,
    image
  );
  return successResponse(res, {
    message: ResponseMessage.DASHBOARD_PROPERTY_CREATED,
    data: dashboard,
  });
};

export const updateDashboardPropertyController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { name, role, propertyId, image, route } = req.body;
  // * checks if the property is available or not
  const isValidProperty = await getPropertyByPropertyIdService(propertyId);
  if (isValidProperty.length == 0) {
    return errorResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      message: ResponseMessage.NO_PROPERTY_FOUND,
      errors: {},
    });
  }
  // * if property is available then update it and return
  const updatedProperty = await updateDashBoardPropertyService(
    name,
    role,
    propertyId,
    route,
    image
  );
  return successResponse(res, {
    message: ResponseMessage.PROPERTY_UPDATED,
    data: updatedProperty,
  });
};

export const getSingleProperty_And_PermissionsService = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { propertyId } = req.params;
  const property = await getPropertyByPropertyIdService(
    new Types.ObjectId(propertyId)
  );
  return successResponse(res, {
    message: ResponseMessage.SUCCESS,
    data: property,
  });
};

export const getAllDashboardPropertyController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const properties = await getAllDashboardPropertiesService();
  return successResponse(res, {
    message: ResponseMessage.SUCCESS,
    data: properties,
  });
};
