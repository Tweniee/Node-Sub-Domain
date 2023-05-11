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
exports.checkForPermissionService = exports.createTemplateContentService = void 0;
const Index_1 = require("../../Model/Index");
const Users_Service_1 = require("../Users/Users.Service");
const Dashboard_Service_1 = require("../Dashboard/Dashboard.Service");
const UniqueValues_1 = __importDefault(require("../../Constants/UniqueValues"));
const createTemplateContentService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const content = yield Index_1.TemplateContentModel.create(body);
    return content;
});
exports.createTemplateContentService = createTemplateContentService;
const checkForPermissionService = (userId, permission) => __awaiter(void 0, void 0, void 0, function* () {
    // *Getting Role from userId
    const { role } = yield (0, Users_Service_1.getTheRoleByUserIdService)(userId);
    // *Checking the roleId is has the permission for the operation
    const { permissionId } = yield (0, Dashboard_Service_1.getAllPermissionService)(role);
    if (permission == UniqueValues_1.default.CREATE_PERMISSION) {
        return permissionId.canCreate;
    }
    else if (permission == UniqueValues_1.default.READ_PERMISSION) {
        return permissionId.canRead;
    }
    else if (permission == UniqueValues_1.default.UPDATE_PERMISSION) {
        return permissionId.canUpdate;
    }
    else if (permission == UniqueValues_1.default.DELETE_PERMISSION) {
        return permissionId.canDelete;
    }
    else {
        return false;
    }
});
exports.checkForPermissionService = checkForPermissionService;
