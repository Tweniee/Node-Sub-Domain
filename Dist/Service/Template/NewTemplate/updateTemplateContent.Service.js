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
exports.getOldSectionFiveService = exports.updateGrowthSectionService = exports.getOldSectionFourService = exports.updateExpSectionService = exports.getOldSectionThreeService = exports.updateCardIconService = exports.getOldSectionTwoService = exports.updateBannerImageService = exports.getOldSectionOneService = exports.updateTextService = void 0;
const mongoose_1 = require("mongoose");
const Banner_Model_1 = require("../../../Model/TemplateContent/Banner/Banner.Model");
const Text_model_1 = require("../../../Model/TemplateContent/Text/Text.model");
const Cards_Model_1 = require("../../../Model/TemplateContent/Cards/Cards.Model");
const Experience_Model_1 = require("../../../Model/TemplateContent/Experience/Experience.Model");
const Growth_Model_1 = require("../../../Model/TemplateContent/Growth/Growth.Model");
const About_Model_1 = __importDefault(require("../../../Model/TemplateContent/About/About.Model"));
// * Section Text
const updateTextService = (textId, text) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedText = yield Text_model_1.TemplateTextModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(textId) }, { text: text }, { new: true });
    return updatedText;
});
exports.updateTextService = updateTextService;
// *Section One
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
// * Section Three
const getOldSectionThreeService = (expId) => __awaiter(void 0, void 0, void 0, function* () {
    const exp = yield Experience_Model_1.TemplateExperienceSectionModel.aggregate([
        {
            $match: {
                _id: new mongoose_1.Types.ObjectId(expId),
                isActive: true,
                isDeleted: false,
            },
        },
        {
            $project: 
            /**
             * specifications: The fields to
             *   include or exclude.
             */
            {
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
        {
            $lookup: {
                from: "templatetexts",
                localField: "imageText",
                foreignField: "_id",
                as: "imageText",
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
                path: "$imageText",
            },
        },
    ]);
    return exp[0];
});
exports.getOldSectionThreeService = getOldSectionThreeService;
const updateExpSectionService = (expId, bg_Color, icon, cardImage) => __awaiter(void 0, void 0, void 0, function* () {
    const exp = yield Experience_Model_1.TemplateExperienceSectionModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(expId) }, { $set: { bg_Color, icon, cardImage } }, { new: true });
    return exp;
});
exports.updateExpSectionService = updateExpSectionService;
// * Section Four
const getOldSectionFourService = (growthId) => __awaiter(void 0, void 0, void 0, function* () {
    const growth = yield Growth_Model_1.TemplateGrowthSectionModel.aggregate([
        {
            $match: {
                _id: new mongoose_1.Types.ObjectId(growthId),
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
    return growth[0];
});
exports.getOldSectionFourService = getOldSectionFourService;
const updateGrowthSectionService = (growthId, bulletIcons, bulletPoints, icon, cardImage) => __awaiter(void 0, void 0, void 0, function* () {
    const growth = yield Growth_Model_1.TemplateGrowthSectionModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(growthId) }, { $set: { bulletIcons, bulletPoints, icon, cardImage } }, { new: true });
    return growth;
});
exports.updateGrowthSectionService = updateGrowthSectionService;
// * Section five
const getOldSectionFiveService = (aboutId) => __awaiter(void 0, void 0, void 0, function* () {
    const about = yield About_Model_1.default.aggregate([
        {
            $match: {
                _id: new mongoose_1.Types.ObjectId(aboutId),
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
                cards: 0,
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
                        $match: 
                        /**
                         * query: The query in MQL.
                         */
                        {
                            isActive: true,
                            isDeleted: false,
                        },
                    },
                    {
                        $project: 
                        /**
                         * specifications: The fields to
                         *   include or exclude.
                         */
                        {
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
                                    $match: 
                                    /**
                                     * query: The query in MQL.
                                     */
                                    {
                                        isActive: true,
                                        isDeleted: false,
                                    },
                                },
                                {
                                    $project: 
                                    /**
                                     * specifications: The fields to
                                     *   include or exclude.
                                     */
                                    {
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
    return about[0];
});
exports.getOldSectionFiveService = getOldSectionFiveService;
