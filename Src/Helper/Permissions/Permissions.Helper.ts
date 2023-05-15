import { Types } from "mongoose";
import { getAllPermissionService } from "../../Service/Dashboard/Dashboard.Service";
import { getTheRoleByUserIdService } from "../../Service/Users/Users.Service";
import UniqueValues from "../../Constants/UniqueValues";

export const checkForPermissionService = async (
  tab: string,
  userId: Types.ObjectId,
  permission: string
): Promise<boolean> => {
  // *Getting Role from userId
  const { role } = await getTheRoleByUserIdService(userId);
  // *Checking the roleId is has the permission for the operation
  const { permissionId } = await getAllPermissionService(role, tab);
  if (permission == UniqueValues.CREATE_PERMISSION) {
    return permissionId.canCreate;
  } else if (permission == UniqueValues.READ_PERMISSION) {
    return permissionId.canRead;
  } else if (permission == UniqueValues.UPDATE_PERMISSION) {
    return permissionId.canUpdate;
  } else if (permission == UniqueValues.DELETE_PERMISSION) {
    return permissionId.canDelete;
  } else {
    return false;
  }
};
