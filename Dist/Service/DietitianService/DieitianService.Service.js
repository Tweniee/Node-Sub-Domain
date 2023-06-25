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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleDietitianServiceMainService = exports.getSingleDietitianService_Service = exports.getAllDietitianService_Service = exports.deleteDietitianService_Service = exports.updateDietitianService_Service = exports.createDietitianService_Service = void 0;
const mongoose_1 = require("mongoose");
const Index_1 = require("../../Model/Index");
// * Create Single Service
const createDietitianService_Service = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const dietitianService = yield Index_1.DietitianServiceModel.create(body);
    return dietitianService;
});
exports.createDietitianService_Service = createDietitianService_Service;
// * Update Single Service
const updateDietitianService_Service = (body, dietitian) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId, description, price, durationInMinutes, numberOfSessionPerWeek, totalWeekForSession, } = body;
    const dietitianService = yield (0, exports.getSingleDietitianService_Service)(serviceId, dietitian);
    if (dietitianService.length == 0) {
        return false;
    }
    const updatedDietitianService = yield Index_1.DietitianServiceModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(serviceId) }, {
        $set: {
            description,
            price,
            durationInMinutes,
            numberOfSessionPerWeek,
            totalWeekForSession,
        },
    }, { new: true });
    return updatedDietitianService;
});
exports.updateDietitianService_Service = updateDietitianService_Service;
// * Delete Single Service
const deleteDietitianService_Service = (serviceId, dietitian) => __awaiter(void 0, void 0, void 0, function* () {
    const dietitianService = yield (0, exports.getSingleDietitianService_Service)(serviceId, dietitian);
    if (dietitianService.length == 0) {
        return false;
    }
    const deletedDietitianService = yield Index_1.DietitianServiceModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(serviceId) }, { $set: { isActive: false, isDeleted: true } }, { new: true });
    return deletedDietitianService;
});
exports.deleteDietitianService_Service = deleteDietitianService_Service;
// * Get All service of a dietitian Records
const getAllDietitianService_Service = (dietitian) => __awaiter(void 0, void 0, void 0, function* () {
    const dietitianService = yield Index_1.DietitianServiceModel.aggregate([
        {
            $match: {
                isActive: true,
                isDeleted: false,
                dietitian: new mongoose_1.Types.ObjectId(dietitian),
            },
        },
        {
            $lookup: {
                from: "services",
                localField: "serviceName",
                foreignField: "_id",
                as: "serviceName",
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
            $addFields: {
                userId: "$dietitian",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "dietitian",
                foreignField: "_id",
                as: "dietitian",
                pipeline: [
                    {
                        $match: {
                            isActive: true,
                            isDeleted: false,
                        },
                    },
                    {
                        $project: {
                            role: 1,
                            username: 1,
                            lastName: 1,
                            firstName: 1,
                            dateOfBirth: 1,
                        },
                    },
                    {
                        $lookup: {
                            from: "roles",
                            localField: "role",
                            foreignField: "_id",
                            as: "role",
                            pipeline: [
                                {
                                    $match: {
                                        isActive: true,
                                        isDeleted: false,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        $unwind: {
                            path: "$role",
                        },
                    },
                    {
                        $addFields: {
                            role: "$role.name",
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$dietitian",
            },
        },
        {
            $unwind: {
                path: "$serviceName",
            },
        },
        {
            $project: {
                isActive: 0,
                isDeleted: 0,
                createdAt: 0,
                updatedAt: 0,
                availableDays: 0,
            },
        },
    ]);
    return dietitianService;
});
exports.getAllDietitianService_Service = getAllDietitianService_Service;
// * Get Single Service
const getSingleDietitianService_Service = (serviceId, dietitian) => __awaiter(void 0, void 0, void 0, function* () {
    const dietitianService = yield Index_1.DietitianServiceModel.aggregate([
        {
            $match: {
                isActive: true,
                isDeleted: false,
                dietitian: new mongoose_1.Types.ObjectId(dietitian),
                _id: new mongoose_1.Types.ObjectId(serviceId),
            },
        },
        {
            $lookup: {
                from: "services",
                localField: "serviceName",
                foreignField: "_id",
                as: "serviceName",
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
            $addFields: {
                userId: "$dietitian",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "dietitian",
                foreignField: "_id",
                as: "dietitian",
                pipeline: [
                    {
                        $match: {
                            isActive: true,
                            isDeleted: false,
                        },
                    },
                    {
                        $project: {
                            role: 1,
                            username: 1,
                            lastName: 1,
                            firstName: 1,
                            dateOfBirth: 1,
                        },
                    },
                    {
                        $lookup: {
                            from: "roles",
                            localField: "role",
                            foreignField: "_id",
                            as: "role",
                            pipeline: [
                                {
                                    $match: {
                                        isActive: true,
                                        isDeleted: false,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        $unwind: {
                            path: "$role",
                        },
                    },
                    {
                        $addFields: {
                            role: "$role.name",
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$dietitian",
            },
        },
        {
            $unwind: {
                path: "$serviceName",
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
    return dietitianService;
});
exports.getSingleDietitianService_Service = getSingleDietitianService_Service;
// * Get Single Service
const getSingleDietitianServiceMainService = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const dietitianService = yield Index_1.DietitianServiceModel.aggregate([
        {
            $match: {
                isActive: true,
                isDeleted: false,
                _id: new mongoose_1.Types.ObjectId(serviceId),
            },
        },
        {
            $lookup: {
                from: "services",
                localField: "serviceName",
                foreignField: "_id",
                as: "serviceName",
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
            $addFields: {
                userId: "$dietitian",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "dietitian",
                foreignField: "_id",
                as: "dietitian",
                pipeline: [
                    {
                        $match: {
                            isActive: true,
                            isDeleted: false,
                        },
                    },
                    {
                        $project: {
                            role: 1,
                            username: 1,
                            lastName: 1,
                            firstName: 1,
                            dateOfBirth: 1,
                        },
                    },
                    {
                        $lookup: {
                            from: "roles",
                            localField: "role",
                            foreignField: "_id",
                            as: "role",
                            pipeline: [
                                {
                                    $match: {
                                        isActive: true,
                                        isDeleted: false,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        $unwind: {
                            path: "$role",
                        },
                    },
                    {
                        $addFields: {
                            role: "$role.name",
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$dietitian",
            },
        },
        {
            $unwind: {
                path: "$serviceName",
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
    return dietitianService;
});
exports.getSingleDietitianServiceMainService = getSingleDietitianServiceMainService;
