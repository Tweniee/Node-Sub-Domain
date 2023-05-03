import { Types } from "mongoose";
import RoleModel from "../../Model/Roles/Role.Model";

// * check is not present and creates the role
export const createRoleService = async (name: string) => {
  const roles = await searchRoleByRoleName(name);
  if (roles.length == 0) {
    const role = await RoleModel.create({ name });
    return role;
  }
  return false;
};

// * find the role on the base of role name
export const searchRoleByRoleName = async (name: string) => {
  const role = await RoleModel.aggregate([
    {
      $match: { name: { $eq: name } },
    },
    {
      $project: {
        _id: 1,
        name: 1,
      },
    },
  ]);
  return role;
};

// * checks if role is present and then updates it
export const updateRoleService = async (roleId: string, name: string) => {
  const role = await getRoleByRoleId(roleId);
  if (role.length == 0) {
    return false;
  }
  const updatedRole = await RoleModel.findOneAndUpdate(
    { _id: { $eq: roleId } },
    { $set: { name: name } },
    { new: true }
  );
  return updatedRole;
};

// * find the role on the base of roleId
export const getRoleByRoleId = async (roleId: string) => {
  const role = await RoleModel.aggregate([
    {
      $match: {
        _id: { $eq: new Types.ObjectId(roleId) },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
      },
    },
  ]);
  return role;
};

// * find all Roles
export const getAllRolesService = async () => {
  const allRoles = await RoleModel.aggregate([
    {
      $project: {
        _id: 1,
        name: 1,
      },
    },
  ]);
  return allRoles;
};
