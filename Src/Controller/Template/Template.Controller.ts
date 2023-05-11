import { Types } from "mongoose";
import ResponseMessage from "../../Constants/ResponseMessage";
import { expressRequest, expressResponse } from "../../Dependencies";
import { errorResponse, successResponse } from "../../Helper/Response.helper";
import {
  checkForPermissionService,
  createTemplateContentService,
} from "../../Service/Template/Template.Service";
import UniqueValues from "../../Constants/UniqueValues";
import StatusCodes from "../../Constants/StatusCodes";

export const createTemplateContentController = async (
  req: expressRequest,
  res: expressResponse
) => {
  // *getting this userId from token
  const userId = new Types.ObjectId(req?.userId);
  // ! We Need to check if the user has the permission to Perform Action(Create) or not //
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
  const content = await createTemplateContentService({
    tabName,
    parentTab,
    dietitian: userId,
    title,
    subTitle,
    description,
  });
  return successResponse(res, {
    message: ResponseMessage.CONTENT_CREATED_SUCCESSFULLY,
    data: content,
  });
};
