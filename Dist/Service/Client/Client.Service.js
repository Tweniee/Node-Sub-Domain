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
exports.getSingleService_Service = exports.getAllReceivedService_Service = exports.getAllRequestedService_Service = exports.checkToDeleteService = exports.clientServiceDeleteService = exports.createClientEnquiryService = void 0;
const mongoose_1 = require("mongoose");
const UniqueValues_1 = __importDefault(require("../../Constants/UniqueValues"));
const Index_1 = require("../../Model/Index");
const createClientEnquiryService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const clientService = yield Index_1.ClientsModel.create(body);
    yield createClientServiceStatus(clientService);
    return clientService;
});
exports.createClientEnquiryService = createClientEnquiryService;
const createClientServiceStatus = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: client_id, client: clientUserId, dietitian: dietitianUserId, goal: service_id, } = body;
    const subscription = UniqueValues_1.default.ACTIVE;
    const clientServiceStatus = yield Index_1.ClientServiceStatusModel.create({
        client_id,
        clientUserId,
        dietitianUserId,
        service_id,
        subscription,
    });
    return clientServiceStatus;
});
const clientServiceDeleteService = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedService = yield Index_1.ClientsModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(serviceId) }, { $set: { isDeleted: true, isActive: false } }, { new: true });
    yield deleteServiceStatusService(serviceId);
    return deletedService;
});
exports.clientServiceDeleteService = clientServiceDeleteService;
const deleteServiceStatusService = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteServiceStatus = yield Index_1.ClientServiceStatusModel.findOneAndUpdate({ client_id: new mongoose_1.Types.ObjectId(serviceId) }, { $set: { isDeleted: true, isActive: false } }, { new: true });
    return deleteServiceStatus;
});
const checkToDeleteService = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const clientServiceStatus = yield Index_1.ClientServiceStatusModel.find({
        $and: [
            { client_id: new mongoose_1.Types.ObjectId(serviceId) },
            { subscription: { $eq: UniqueValues_1.default.ACTIVE } },
            {
                isActive: true,
            },
            {
                isDeleted: false,
            },
        ],
    });
    return clientServiceStatus;
});
exports.checkToDeleteService = checkToDeleteService;
const getAllRequestedService_Service = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const allData = yield Index_1.ClientServiceStatusModel.aggregate([
        {
            $match: {
                clientUserId: { $eq: new mongoose_1.Types.ObjectId(userId) },
                isActive: true,
                isDeleted: false,
            },
        },
        {
            $lookup: {
                from: "clients",
                localField: "client_id",
                foreignField: "_id",
                as: "clientDetails",
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
                path: "$clientDetails",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "clientUserId",
                foreignField: "_id",
                as: "user",
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
                            email: 1,
                            lastName: 1,
                            firstName: 1,
                            dateOfBirth: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$user",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "dietitianUserId",
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
                            email: 1,
                            lastName: 1,
                            firstName: 1,
                            dateOfBirth: 1,
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
            $lookup: {
                from: "services",
                localField: "service_id",
                foreignField: "_id",
                as: "service",
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
                path: "$service",
            },
        },
        {
            $project: {
                clientDetails: 1,
                user: 1,
                dietitian: 1,
                service: 1,
                subscription: 1,
            },
        },
    ]);
    return allData;
});
exports.getAllRequestedService_Service = getAllRequestedService_Service;
const getAllReceivedService_Service = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const allData = yield Index_1.ClientServiceStatusModel.aggregate([
        {
            $match: {
                dietitianUserId: { $eq: new mongoose_1.Types.ObjectId(userId) },
                isActive: true,
                isDeleted: false,
            },
        },
        {
            $lookup: {
                from: "clients",
                localField: "client_id",
                foreignField: "_id",
                as: "clientDetails",
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
                path: "$clientDetails",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "clientUserId",
                foreignField: "_id",
                as: "user",
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
                            email: 1,
                            lastName: 1,
                            firstName: 1,
                            dateOfBirth: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$user",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "dietitianUserId",
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
                            email: 1,
                            lastName: 1,
                            firstName: 1,
                            dateOfBirth: 1,
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
            $lookup: {
                from: "services",
                localField: "service_id",
                foreignField: "_id",
                as: "service",
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
                path: "$service",
            },
        },
        {
            $project: {
                clientDetails: 1,
                user: 1,
                dietitian: 1,
                service: 1,
                subscription: 1,
            },
        },
    ]);
    return allData;
});
exports.getAllReceivedService_Service = getAllReceivedService_Service;
const getSingleService_Service = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield yield Index_1.ClientServiceStatusModel.aggregate([
        {
            $match: {
                client_id: { $eq: new mongoose_1.Types.ObjectId(serviceId) },
                isActive: true,
                isDeleted: false,
            },
        },
        {
            $lookup: {
                from: "clients",
                localField: "client_id",
                foreignField: "_id",
                as: "clientDetails",
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
                path: "$clientDetails",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "clientUserId",
                foreignField: "_id",
                as: "user",
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
                            email: 1,
                            lastName: 1,
                            firstName: 1,
                            dateOfBirth: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$user",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "dietitianUserId",
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
                            email: 1,
                            lastName: 1,
                            firstName: 1,
                            dateOfBirth: 1,
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
            $lookup: {
                from: "services",
                localField: "service_id",
                foreignField: "_id",
                as: "service",
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
                path: "$service",
            },
        },
        {
            $project: {
                clientDetails: 1,
                user: 1,
                dietitian: 1,
                service: 1,
                subscription: 1,
            },
        },
    ]);
    return service;
});
exports.getSingleService_Service = getSingleService_Service;
