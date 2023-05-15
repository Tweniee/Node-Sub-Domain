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
exports.restoreTemplateContentService = exports.deleteTemplateContentService = exports.updateTemplateContentService = exports.getContentByContentIDService = exports.getAllTemplateContentService = exports.updateParentService = exports.createTemplateContentService = void 0;
const mongoose_1 = require("mongoose");
const Index_1 = require("../../Model/Index");
const createTemplateContentService = (body, parentId) => __awaiter(void 0, void 0, void 0, function* () {
    const content = yield Index_1.TemplateContentModel.create(body);
    yield (0, exports.updateParentService)(parentId, content._id);
    return content;
});
exports.createTemplateContentService = createTemplateContentService;
const updateParentService = (parentId, _id) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedParent = yield Index_1.TemplateContentModel.findOneAndUpdate({
        _id: new mongoose_1.Types.ObjectId(parentId),
    }, { $push: { children: _id } }, { new: true });
    return updatedParent;
});
exports.updateParentService = updateParentService;
const getAllTemplateContentService = () => __awaiter(void 0, void 0, void 0, function* () {
    const content = yield Index_1.TemplateContentModel.aggregate([
        {
            $match: {
                isActive: true,
                isDeleted: false,
                parentTab: null,
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
        {
            $lookup: {
                from: "templatecontents",
                localField: "children",
                foreignField: "_id",
                as: "children",
                pipeline: [
                    {
                        $match: {
                            parentTab: { $ne: null },
                            isActive: true,
                            isDeleted: false,
                        },
                    },
                    {
                        $project: {
                            isActive: 0,
                            isDeleted: 0,
                            parentTab: 0,
                            createdAt: 0,
                            updatedAt: 0,
                        },
                    },
                ],
            },
        },
    ]);
    return content;
});
exports.getAllTemplateContentService = getAllTemplateContentService;
const getContentByContentIDService = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const content = yield Index_1.TemplateContentModel.aggregate([
        {
            $match: {
                _id: { $eq: new mongoose_1.Types.ObjectId(_id) },
                isActive: false,
                isDeleted: true,
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
        {
            $lookup: {
                from: "templatecontents",
                localField: "children",
                foreignField: "_id",
                as: "children",
                pipeline: [
                    {
                        $match: {
                            parentTab: { $ne: null },
                            isActive: true,
                            isDeleted: false,
                        },
                    },
                    {
                        $project: {
                            isActive: 0,
                            isDeleted: 0,
                            parentTab: 0,
                            createdAt: 0,
                            updatedAt: 0,
                        },
                    },
                ],
            },
        },
    ]);
    return content;
});
exports.getContentByContentIDService = getContentByContentIDService;
const updateTemplateContentService = (contentId, title, description, subTitle) => __awaiter(void 0, void 0, void 0, function* () {
    if (subTitle) {
        const updatedContent = yield Index_1.TemplateContentModel.findOneAndUpdate({ _id: { $eq: new mongoose_1.Types.ObjectId(contentId) } }, { $set: { title, description, subTitle } }, { new: true, upsert: true });
        return updatedContent;
    }
    const updatedContent = yield Index_1.TemplateContentModel.findOneAndUpdate({ _id: { $eq: new mongoose_1.Types.ObjectId(contentId) } }, { $set: { title, description } }, { new: true });
    return updatedContent;
});
exports.updateTemplateContentService = updateTemplateContentService;
const deleteTemplateContentService = (contentId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedContent = yield Index_1.TemplateContentModel.findOneAndUpdate({
        _id: { $eq: new mongoose_1.Types.ObjectId(contentId) },
        isDeleted: false,
        isActive: true,
    }, { $set: { isDeleted: true, isActive: false } }, { new: true });
    return updatedContent;
});
exports.deleteTemplateContentService = deleteTemplateContentService;
const restoreTemplateContentService = (contentId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedContent = yield Index_1.TemplateContentModel.findOneAndUpdate({
        _id: { $eq: new mongoose_1.Types.ObjectId(contentId) },
        isDeleted: true,
        isActive: false,
    }, { $set: { isDeleted: false, isActive: true } }, { new: true });
    return updatedContent;
});
exports.restoreTemplateContentService = restoreTemplateContentService;
