import { Types } from "mongoose";
import ResponseMessage from "../../Constants/ResponseMessage";
import { expressRequest, expressResponse } from "../../Dependencies";
import { errorResponse, successResponse } from "../../Helper/Response.helper";
import {
  checkForPermissionService,
  createTemplateContentService,
  deleteTemplateContentService,
  getAllTemplateContentService,
  getContentByContentIDService,
  restoreTemplateContentService,
  updateTemplateContentService,
} from "../../Service/Template/Template.Service";
import UniqueValues from "../../Constants/UniqueValues";
import StatusCodes from "../../Constants/StatusCodes";

export const createTemplateContentController = async (
  req: expressRequest,
  res: expressResponse
) => {
  // *getting this userId from token
  const userId = new Types.ObjectId(req?.userId);
  const hasPermission = await checkForPermissionService(
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
  // * creating Template Content
  const { tabName, parentTab = null, title, subTitle, description } = req.body;
  const content = await createTemplateContentService(
    {
      tabName,
      dietitian: userId,
      title,
      parentTab,
      subTitle,
      description,
    },
    parentTab
  );
  return successResponse(res, {
    message: ResponseMessage.CONTENT_CREATED_SUCCESSFULLY,
    data: content,
  });
};

export const getAllTemplateContentController = async (
  req: expressRequest,
  res: expressResponse
) => {
  // *getting this userId from token
  const userId = new Types.ObjectId(req?.userId);
  const hasPermission = await checkForPermissionService(
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
  const content = await getAllTemplateContentService();
  return successResponse(res, {
    message: ResponseMessage.SUCCESS,
    data: content,
  });
};

export const updateTemplateContentController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { contentId, title, subTitle = null, description } = req.body;
  const content = await getContentByContentIDService(contentId);
  if (content.length == 0) {
    return errorResponse(res, {
      statusCode: StatusCodes.CONFLICT,
      message: ResponseMessage.TEMPLATE_CONTENT_NOT_FOUND,
      errors: {},
    });
  }
  const updatedContent = await updateTemplateContentService(
    contentId,
    title,
    description,
    subTitle
  );
  return successResponse(res, {
    message: ResponseMessage.UPDATED_SUCCESSFULLY,
    data: updatedContent,
  });
};
export const deleteTemplateContentController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { contentId } = req.params;
  const content = await getContentByContentIDService(
    new Types.ObjectId(contentId)
  );
  if (content.length == 0) {
    return errorResponse(res, {
      statusCode: StatusCodes.CONFLICT,
      message: ResponseMessage.TEMPLATE_CONTENT_NOT_FOUND,
      errors: {},
    });
  }
  const deletedContent = await deleteTemplateContentService(
    new Types.ObjectId(contentId)
  );
  return successResponse(res, {
    message: ResponseMessage.DELETED_SUCCESSFULLY,
    data: deletedContent,
  });
};

export const restoreTemplateContentController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { contentId } = req.params;
  const content = await getContentByContentIDService(
    new Types.ObjectId(contentId)
  );
  if (content.length == 0) {
    return errorResponse(res, {
      statusCode: StatusCodes.CONFLICT,
      message: ResponseMessage.TEMPLATE_CONTENT_NOT_FOUND,
      errors: {},
    });
  }
  const restoredContent = await restoreTemplateContentService(
    new Types.ObjectId(contentId)
  );
  return successResponse(res, {
    message: ResponseMessage.RESTORED_SUCCESSFULLY,
    data: restoredContent,
  });
};
