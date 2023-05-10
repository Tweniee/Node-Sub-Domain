import { Types } from "mongoose";
import { PermissionModel } from "../../../Model/Index";

export const updatePermissionService = async (
  permissionId: Types.ObjectId,
  canCreate: boolean,
  canRead: boolean,
  canUpdate: boolean,
  canDelete: boolean
) => {
  const updatedPermission = await PermissionModel.findOneAndUpdate(
    {
      _id: new Types.ObjectId(permissionId),
    },
    { $set: { canCreate, canRead, canUpdate, canDelete } },
    { new: true }
  );
  return updatedPermission;
};
