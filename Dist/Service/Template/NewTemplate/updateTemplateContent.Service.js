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
exports.updateCardIconService = exports.getOldSectionTwoService = exports.updateBannerImageService = exports.updateTextService = exports.getOldSectionOneService = void 0;
const mongoose_1 = require("mongoose");
const Banner_Model_1 = require("../../../Model/TemplateContent/Banner/Banner.Model");
const Text_model_1 = require("../../../Model/TemplateContent/Text/Text.model");
const Cards_Model_1 = require("../../../Model/TemplateContent/Cards/Cards.Model");
const getOldSectionOneService = (bannerId) => __awaiter(void 0, void 0, void 0, function* () {
    const sectionOne = yield Banner_Model_1.TemplateBannerSectionModel.aggregate([
        {
            $match: {
                _id: new mongoose_1.Types.ObjectId(bannerId),
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
        {
            $lookup: {
                from: "templatetexts",
                localField: "text",
                foreignField: "_id",
                as: "text",
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
                    {
                        $lookup: {
                            from: "templatetexts",
                            localField: "subHeading",
                            foreignField: "_id",
                            as: "subHeading",
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
                                {
                                    $project: {
                                        _id: 1,
                                        text: 1,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        $unwind: {
                            path: "$subHeading",
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            subHeading: 1,
                            text: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$text",
            },
        },
    ]);
    return sectionOne[0];
});
exports.getOldSectionOneService = getOldSectionOneService;
const updateTextService = (textId, text) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedText = yield Text_model_1.TemplateTextModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(textId) }, { text: text }, { new: true });
    return updatedText;
});
exports.updateTextService = updateTextService;
const updateBannerImageService = (bannerId, bg_image) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(bannerId, bg_image);
    const bannerImage = yield Banner_Model_1.TemplateBannerSectionModel.findOneAndUpdate({
        _id: new mongoose_1.Types.ObjectId(bannerId),
    }, { $set: { bg_Image: bg_image } }, { new: true });
    console.log(bannerImage);
    return bannerImage;
});
exports.updateBannerImageService = updateBannerImageService;
// * Section Two
const getOldSectionTwoService = (cardId) => __awaiter(void 0, void 0, void 0, function* () {
    const cards = yield Cards_Model_1.TemplateCardSectionModel.aggregate([
        {
            $match: {
                _id: new mongoose_1.Types.ObjectId(cardId),
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
        {
            $lookup: {
                from: "templatetexts",
                localField: "text",
                foreignField: "_id",
                as: "text",
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
                    {
                        $lookup: {
                            from: "templatetexts",
                            localField: "subHeading",
                            foreignField: "_id",
                            as: "subHeading",
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
                                {
                                    $project: {
                                        _id: 1,
                                        text: 1,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        $unwind: {
                            path: "$subHeading",
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            subHeading: 1,
                            text: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$text",
            },
        },
    ]);
    return cards[0];
});
exports.getOldSectionTwoService = getOldSectionTwoService;
const updateCardIconService = (cardId, icon) => __awaiter(void 0, void 0, void 0, function* () {
    const card = yield Cards_Model_1.TemplateCardSectionModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(cardId) }, { $set: { icon: icon } });
    return card;
});
exports.updateCardIconService = updateCardIconService;
