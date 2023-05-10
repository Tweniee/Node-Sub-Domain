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
exports.updatePermissionController = void 0;
const ResponseMessage_1 = __importDefault(require("../../../Constants/ResponseMessage"));
const Response_helper_1 = require("../../../Helper/Response.helper");
const Permission_Service_1 = require("../../../Service/Dashboard/Permissions/Permission.Service");
const updatePermissionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { permissionId, canCreate = false, canRead = false, canUpdate = false, canDelete = false, } = req.body;
    const permission = yield (0, Permission_Service_1.updatePermissionService)(permissionId, canCreate, canRead, canUpdate, canDelete);
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.PERMISSION_UPDATED,
        data: permission,
    });
});
exports.updatePermissionController = updatePermissionController;
