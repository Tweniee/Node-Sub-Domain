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
exports.getAllEnquiryService = exports.createEnquiryService = void 0;
const Index_1 = require("../../Model/Index");
const createEnquiryService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const enquiry = yield Index_1.EnquiryModel.create(body);
    return enquiry;
});
exports.createEnquiryService = createEnquiryService;
const getAllEnquiryService = () => __awaiter(void 0, void 0, void 0, function* () {
    const enquiry = yield Index_1.EnquiryModel.aggregate([
        {
            $match: {
                isActive: true,
                isDeleted: false,
            },
        },
        {
            $lookup: {
                from: "services",
                localField: "goal",
                foreignField: "_id",
                as: "goal",
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
                path: "$goal",
            },
        },
        {
            $addFields: {
                goal: "$goal.name",
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
    return enquiry;
});
exports.getAllEnquiryService = getAllEnquiryService;
