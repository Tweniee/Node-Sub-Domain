import ResponseMessage from "../../Constants/ResponseMessage";
import StatusCodes from "../../Constants/StatusCodes";
import { expressResponse, expressRequest } from "../../Dependencies";
import { errorResponse, successResponse } from "../../Helper/Response.helper";
import {
  createRoleService,
  getAllRolesService,
  getRoleByRoleId,
  updateRoleService,
} from "../../Service/Roles/Role.service";

// * TO Create A new role but it can only be created by super admin
export const createRoleController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { name } = req.body;
  const role = await createRoleService(name);
  if (!role) {
    // * if Role name is already present
    return errorResponse(res, {
      statusCode: StatusCodes.CONFLICT,
      message: ResponseMessage.ROLE_ALREADY_PRESENT,
      errors: {},
    });
  }
  // * success
  return successResponse(res, {
    message: ResponseMessage.ROLE_CREATED,
    data: role,
  });
};

// * TO Update role but it can only be updated by super admin
export const updateRoleController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { roleId, name } = req.body;
  const updatedRole = await updateRoleService(roleId, name);
  if (!updatedRole) {
    // * if role is not present on the server
    return errorResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      message: ResponseMessage.ROLE_NOT_PRESENT,
      errors: {},
    });
  }
  // * success
  return successResponse(res, {
    message: ResponseMessage.ROLE_UPDATED,
    data: updatedRole,
  });
};

// * TO Delete role but it can only be deleted by super admin
export const deleteRoleController = async (
  req: expressRequest,
  res: expressResponse
) => {
  // ! TBD
};

// * TO Get All Roles available in the portal
export const getAllRoleController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const Roles = await getAllRolesService();
  return successResponse(res, {
    message: ResponseMessage.SUCCESS,
    data: Roles,
  });
};

// * Get Single role by role Id
export const getRoleByIdController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { roleId } = req.body;
  const role = await getRoleByRoleId(roleId);
  return successResponse(res, {
    message: ResponseMessage.SUCCESS,
    data: role[0],
  });
};
