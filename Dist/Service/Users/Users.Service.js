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
exports.getTheRoleByUserIdService = exports.getUserById_Without_Lookup_Service = exports.getSingleUserService = exports.getAllUserService = void 0;
const mongoose_1 = require("mongoose");
const Index_1 = require("../../Model/Index");
const getAllUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield Index_1.UserModel.aggregate([
        {
            $match: {
                isActive: { $eq: true },
                isDeleted: { $eq: false },
            },
        },
        {
            $project: {
                password: 0,
                isActive: 0,
                isDeleted: 0,
                createdAt: 0,
                updatedAt: 0,
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
                            isActive: { $eq: true },
                            isDeleted: { $eq: false },
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
    ]);
    return users;
});
exports.getAllUserService = getAllUserService;
const getSingleUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userId);
    const user = yield Index_1.UserModel.aggregate([
        {
            $match: {
                _id: { $eq: new mongoose_1.Types.ObjectId(userId) },
                isActive: true,
                isDeleted: false,
            },
        },
        {
            $project: {
                password: 0,
                isActive: 0,
                isDeleted: 0,
                createdAt: 0,
                updatedAt: 0,
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
    ]);
    console.log(user);
    return user;
});
exports.getSingleUserService = getSingleUserService;
const getUserById_Without_Lookup_Service = (userId) => {
    const user = Index_1.UserModel.aggregate([
        {
            $match: {
                _id: new mongoose_1.Types.ObjectId(userId),
            },
        },
        {
            $project: {
                role: 1,
                email: 1,
                username: 1,
                lastName: 1,
                firstName: 1,
                dateOfBirth: 1,
            },
        },
    ]);
    return user;
};
exports.getUserById_Without_Lookup_Service = getUserById_Without_Lookup_Service;
const getTheRoleByUserIdService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield Index_1.UserModel.aggregate([
        {
            $match: {
                _id: new mongoose_1.Types.ObjectId(userId),
                isActive: true,
                isDeleted: false,
            },
        },
        {
            $project: {
                role: 1,
            },
        },
    ]);
    return roles[0];
});
exports.getTheRoleByUserIdService = getTheRoleByUserIdService;
