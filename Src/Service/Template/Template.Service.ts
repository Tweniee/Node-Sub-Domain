import { Types } from "mongoose";
import { TemplateContentModel } from "../../Model/Index";
import { getTheRoleByUserIdService } from "../Users/Users.Service";
import { getAllPermissionService } from "../Dashboard/Dashboard.Service";
import UniqueValues from "../../Constants/UniqueValues";

interface IContentBodyInfo {
  tabName: Types.ObjectId;
  parentTab?: Types.ObjectId | null;
  dietitian: Types.ObjectId;
  title: string;
  subTitle: string;
  description: string;
}

export const createTemplateContentService = async (body: IContentBodyInfo) => {
  const content = await TemplateContentModel.create(body);
  return content;
};

export const checkForPermissionService = async (
  userId: Types.ObjectId,
  permission: string
): Promise<boolean> => {
  // *Getting Role from userId
  const { role } = await getTheRoleByUserIdService(userId);
  // *Checking the roleId is has the permission for the operation
  const { permissionId } = await getAllPermissionService(role);
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
