import { Types } from "mongoose";
import { expressRequest, expressResponse } from "../../Dependencies";
import { checkForPermissionService } from "../../Helper/Permissions/Permissions.Helper";
import UniqueValues from "../../Constants/UniqueValues";
import { errorResponse, successResponse } from "../../Helper/Response.helper";
import StatusCodes from "../../Constants/StatusCodes";
import ResponseMessage from "../../Constants/ResponseMessage";
import {
  createSubscriptionPlanService,
  deleteSubscriptionPlanService,
  getAllSubscriptionPlanService,
  getSingleSubscriptionPlanService,
  updateSubscriptionPlanService,
} from "../../Service/Subscription/Subscription.Service";
import { invalid } from "joi";

export const createSubscriptionPlanController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { tabName, name, description, currency, price, duration } = req.body;
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
  const subscriptionPlan = await createSubscriptionPlanService({
    tabName,
    name,
    description,
    currency,
    price,
    duration,
  });
  return successResponse(res, {
    message: ResponseMessage.CREATED_SUBSCRIPTION_PLAN,
    data: subscriptionPlan,
  });
};

export const getSubscriptionPlanByIdController = async (
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
  const { planId } = req.params;
  const subscriptionPlan = await getSingleSubscriptionPlanService(planId);
  return successResponse(res, {
    message: ResponseMessage.SUCCESS,
    data: subscriptionPlan,
  });
};

export const getAllSubscriptionPlanController = async (
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
  const subscriptionPlan = await getAllSubscriptionPlanService();
  return successResponse(res, {
    message: ResponseMessage.SUCCESS,
    data: subscriptionPlan,
  });
};
export const deleteSubscriptionPlanController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { tabName } = req.query;
  // *getting this userId from token
  const userId = new Types.ObjectId(req?.userId);
  const hasPermission = await checkForPermissionService(
    String(tabName),
    userId,
    UniqueValues.DELETE_PERMISSION
  );
  if (!hasPermission) {
    return errorResponse(res, {
      statusCode: StatusCodes.UNAUTHORIZED,
      message: ResponseMessage.INVALID_ACTION,
      errors: {},
    });
  }
  const { planId } = req.params;
  const isValid = await getSingleSubscriptionPlanService(planId);
  if (isValid.length == 0) {
    return errorResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      message: ResponseMessage.INVALID_PARAMS,
      errors: {},
    });
  }
  const subscriptionPlan = await deleteSubscriptionPlanService(
    new Types.ObjectId(planId)
  );
  return successResponse(res, {
    message: ResponseMessage.CREATED_SUBSCRIPTION_PLAN,
    data: subscriptionPlan,
  });
};

export const updateSubscriptionPlanController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { planId, tabName, name, description, currency, price, duration } =
    req.body;
  // *getting this userId from token
  const userId = new Types.ObjectId(req?.userId);
  const hasPermission = await checkForPermissionService(
    String(tabName),
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
  const isValid = await getSingleSubscriptionPlanService(planId);
  if (isValid.length == 0) {
    return errorResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      message: ResponseMessage.INVALID_PARAMS,
      errors: {},
    });
  }
  const subscriptionPlan = await updateSubscriptionPlanService({
    planId,
    tabName,
    name,
    description,
    currency,
    price,
    duration,
  });
  return successResponse(res, {
    message: ResponseMessage.CREATED_SUBSCRIPTION_PLAN,
    data: subscriptionPlan,
  });
};
