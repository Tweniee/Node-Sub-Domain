"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoleByIdController = exports.getAllRoleController = exports.deleteRoleController = exports.updateRoleController = exports.createRoleController = void 0;
const ResponseMessage_1 = __importDefault(require("../../Constants/ResponseMessage"));
const StatusCodes_1 = __importDefault(require("../../Constants/StatusCodes"));
const Response_helper_1 = require("../../Helper/Response.helper");
const Role_service_1 = require("../../Service/Roles/Role.service");
// * TO Create A new role but it can only be created by super admin
const createRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const role = yield (0, Role_service_1.createRoleService)(name);
    if (!role) {
        // * if Role name is already present
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.CONFLICT,
            message: ResponseMessage_1.default.ROLE_ALREADY_PRESENT,
            errors: {},
        });
    }
    // * success
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.ROLE_CREATED,
        data: role,
    });
});
exports.createRoleController = createRoleController;
// * TO Update role but it can only be updated by super admin
const updateRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roleId, name } = req.body;
    const updatedRole = yield (0, Role_service_1.updateRoleService)(roleId, name);
    if (!updatedRole) {
        // * if role is not present on the server
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.NOT_FOUND,
            message: ResponseMessage_1.default.ROLE_NOT_PRESENT,
            errors: {},
        });
    }
    // * success
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.ROLE_UPDATED,
        data: updatedRole,
    });
});
exports.updateRoleController = updateRoleController;
// * TO Delete role but it can only be deleted by super admin
const deleteRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // ! TBD
});
exports.deleteRoleController = deleteRoleController;
// * TO Get All Roles available in the portal
const getAllRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Roles = yield (0, Role_service_1.getAllRolesService)();
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.SUCCESS,
        data: Roles,
    });
});
exports.getAllRoleController = getAllRoleController;
// * Get Single role by role Id
const getRoleByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roleId } = req.body;
    const role = yield (0, Role_service_1.getRoleByRoleId)(roleId);
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.SUCCESS,
        data: role[0],
    });
});
exports.getRoleByIdController = getRoleByIdController;
