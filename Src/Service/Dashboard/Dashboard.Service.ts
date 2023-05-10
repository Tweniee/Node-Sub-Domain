import { Types } from "mongoose";
import { PermissionModel } from "../../Model/Index";
import DashboardModel from "../../Model/Dashboard/Dashboard.Model";

export const createDashboardPropertyService = async (
  name: string,
  role: Types.ObjectId[]
) => {
  // *Create a Default Permission and get its _id
  const { _id: permissionId } =
    await createDashboard_Property_Permission_Service();

  // * create dashboard property
  const property = await DashboardModel.create({ name, role, permissionId });
  return property;
};

export const createDashboard_Property_Permission_Service = async () => {
  const permission = await PermissionModel.create({});
  return permission;
};
