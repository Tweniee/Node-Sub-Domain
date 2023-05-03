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
exports.getAllRolesService = exports.getRoleByRoleId = exports.updateRoleService = exports.searchRoleByRoleName = exports.createRoleService = void 0;
const mongoose_1 = require("mongoose");
const Role_Model_1 = __importDefault(require("../../Model/Roles/Role.Model"));
// * check is not present and creates the role
const createRoleService = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield (0, exports.searchRoleByRoleName)(name);
    if (roles.length == 0) {
        const role = yield Role_Model_1.default.create({ name });
        return role;
    }
    return false;
});
exports.createRoleService = createRoleService;
// * find the role on the base of role name
const searchRoleByRoleName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const role = yield Role_Model_1.default.find({ name: { $eq: name } });
    return role;
});
exports.searchRoleByRoleName = searchRoleByRoleName;
// * checks if role is present and then updates it
const updateRoleService = (roleId, name) => __awaiter(void 0, void 0, void 0, function* () {
    const role = yield (0, exports.getRoleByRoleId)(roleId);
    if (role.length == 0) {
        return false;
    }
    const updatedRole = yield Role_Model_1.default.findOneAndUpdate({ _id: { $eq: roleId } }, { $set: { name: name } }, { new: true });
    return updatedRole;
});
exports.updateRoleService = updateRoleService;
// * find the role on the base of roleId
const getRoleByRoleId = (roleId) => __awaiter(void 0, void 0, void 0, function* () {
    const role = Role_Model_1.default.aggregate([
        {
            $match: {
                _id: { $eq: new mongoose_1.Types.ObjectId(roleId) },
            },
        },
    ]);
    return role;
});
exports.getRoleByRoleId = getRoleByRoleId;
// * find all Roles
const getAllRolesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const allRoles = yield Role_Model_1.default.aggregate([
        {
            $project: {
                _id: 1,
                name: 1,
            },
        },
    ]);
    return allRoles;
});
exports.getAllRolesService = getAllRolesService;
