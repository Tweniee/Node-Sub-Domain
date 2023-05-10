import ResponseMessage from "../../../Constants/ResponseMessage";
import { expressRequest, expressResponse } from "../../../Dependencies";
import { successResponse } from "../../../Helper/Response.helper";
import { updatePermissionService } from "../../../Service/Dashboard/Permissions/Permission.Service";

export const updatePermissionController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const {
    permissionId,
    canCreate = false,
    canRead = false,
    canUpdate = false,
    canDelete = false,
  } = req.body;
  const permission = await updatePermissionService(
    permissionId,
    canCreate,
    canRead,
    canUpdate,
    canDelete
  );

  return successResponse(res, {
    message: ResponseMessage.PERMISSION_UPDATED,
    data: permission,
  });
};
