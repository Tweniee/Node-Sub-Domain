"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionModel = exports.RoleModel = exports.ServiceModel = exports.UserModel = void 0;
const UserSIgnup_Model_1 = __importDefault(require("./Users/UserSIgnup.Model"));
exports.UserModel = UserSIgnup_Model_1.default;
const Service_model_1 = __importDefault(require("./Services/Service.model"));
exports.ServiceModel = Service_model_1.default;
const Role_Model_1 = __importDefault(require("./Roles/Role.Model"));
exports.RoleModel = Role_Model_1.default;
const Permissions_Model_1 = __importDefault(require("./Dashboard/Permissions/Permissions.Model"));
exports.PermissionModel = Permissions_Model_1.default;
