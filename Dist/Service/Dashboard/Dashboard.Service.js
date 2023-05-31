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
exports.getAllPermissionService = exports.getAllDashboardPropertiesService = exports.getPropertyByPropertyIdService = exports.updateDashBoardPropertyService = exports.createDashboard_Property_Permission_Service = exports.createDashboardPropertyService = void 0;
const mongoose_1 = require("mongoose");
const Index_1 = require("../../Model/Index");
const Dashboard_Model_1 = __importDefault(require("../../Model/Dashboard/Dashboard.Model"));
const createDashboardPropertyService = (name, role, route) => __awaiter(void 0, void 0, void 0, function* () {
    // *Create a Default Permission and get its _id
    const { _id: permissionId } = yield (0, exports.createDashboard_Property_Permission_Service)();
    // * create dashboard property
    const property = yield Dashboard_Model_1.default.create({
        name,
        role,
        permissionId,
        route,
    });
    return property;
});
exports.createDashboardPropertyService = createDashboardPropertyService;
const createDashboard_Property_Permission_Service = () => __awaiter(void 0, void 0, void 0, function* () {
    const permission = yield Index_1.PermissionModel.create({});
    return permission;
});
exports.createDashboard_Property_Permission_Service = createDashboard_Property_Permission_Service;
const updateDashBoardPropertyService = (name, role, propertyId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedProperty = yield Dashboard_Model_1.default.findOneAndUpdate({ _id: { $eq: new mongoose_1.Types.ObjectId(propertyId) } }, { $set: { name, role } }, { new: true });
    return updatedProperty;
});
exports.updateDashBoardPropertyService = updateDashBoardPropertyService;
const getPropertyByPropertyIdService = (propertyId) => __awaiter(void 0, void 0, void 0, function* () {
    const property = yield Dashboard_Model_1.default.aggregate([
        {
            $match: {
                _id: new mongoose_1.Types.ObjectId(propertyId),
                isActive: true,
                isDeleted: false,
            },
        },
        {
            $lookup: {
                from: "permissions",
                localField: "permissionId",
                foreignField: "_id",
                as: "permissionId",
                pipeline: [
                    {
                        $match: {
                            isActive: true,
                            isDeleted: false,
                        },
                    },
                    {
                        $project: {
                            isActive: 0,
                            isDeleted: 0,
                            createdAt: 0,
                            updatedAt: 0,
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$permissionId",
            },
        },
        {
            $project: {
                isActive: 0,
                isDeleted: 0,
                createdAt: 0,
                updatedAt: 0,
            },
        },
    ]);
    return property;
});
exports.getPropertyByPropertyIdService = getPropertyByPropertyIdService;
const getAllDashboardPropertiesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const property = yield Dashboard_Model_1.default.aggregate([
        {
            $match: {
                isActive: true,
                isDeleted: false,
            },
        },
        {
            $lookup: {
                from: "permissions",
                localField: "permissionId",
                foreignField: "_id",
                as: "permissionId",
                pipeline: [
                    {
                        $match: {
                            isActive: true,
                            isDeleted: false,
                        },
                    },
                    {
                        $project: {
                            isActive: 0,
                            isDeleted: 0,
                            createdAt: 0,
                            updatedAt: 0,
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$permissionId",
            },
        },
        {
            $project: {
                isActive: 0,
                isDeleted: 0,
                createdAt: 0,
                updatedAt: 0,
            },
        },
    ]);
    return property;
});
exports.getAllDashboardPropertiesService = getAllDashboardPropertiesService;
const getAllPermissionService = (role, tab) => __awaiter(void 0, void 0, void 0, function* () {
    const permission = yield Dashboard_Model_1.default.aggregate([
        {
            $match: {
                _id: { $eq: new mongoose_1.Types.ObjectId(tab) },
                role: {
                    $in: [new mongoose_1.Types.ObjectId(role)],
                },
                isActive: true,
                isDeleted: false,
            },
        },
        {
            $lookup: {
                from: "permissions",
                localField: "permissionId",
                foreignField: "_id",
                as: "permissionId",
                pipeline: [
                    {
                        $match: {
                            isActive: true,
                            isDeleted: false,
                        },
                    },
                    {
                        $project: {
                            isActive: 0,
                            isDeleted: 0,
                            createdAt: 0,
                            updatedAt: 0,
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$permissionId",
            },
        },
        {
            $project: {
                isActive: 0,
                isDeleted: 0,
                createdAt: 0,
                updatedAt: 0,
                role: 0,
            },
        },
    ]);
    if (permission.length == 0) {
        return { permissionId: null };
    }
    return permission[0];
});
exports.getAllPermissionService = getAllPermissionService;
