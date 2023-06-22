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
exports.getTemplateDataService = exports.getSectionFiveDataService = exports.getSectionFourDataService = exports.getSectionThreeDataService = exports.getSectionTwoDataService = exports.getSectionOneDataService = exports.getSectionByUserIdService = exports.createNewTemplateContentService = void 0;
const mongoose_1 = require("mongoose");
const Banner_Service_1 = require("../Banner/Banner.Service");
const Cards_Service_1 = require("../Cards/Cards.Service");
const Experience_Service_1 = require("../Experience/Experience.Service");
const Growth_Service_1 = require("../Growth/Growth.Service");
const About_Service_1 = require("../About/About.Service");
const TemplateContent_Model_1 = require("../../../Model/TemplateContent/TemplateContent.Model");
const cardText = [
    {
        icon: "fas fa-award",
        heading: "Awarded Agency",
        subText: "Divide details about your product or agency work into parts. A paragraph describing a feature will be enough.",
    },
    {
        icon: "fas fa-retweet",
        heading: "Free Revisions",
        subText: "Keep you user engaged by providing meaningful information. Remember that by this time, the user is curious.",
    },
    {
        icon: "fas fa-fingerprint",
        heading: "Verified Company",
        subText: "Write a few lines about each one. A paragraph describing a feature will be enough. Keep you user engaged!",
    },
];
const createNewTemplateContentService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const banner = yield (0, Banner_Service_1.createTemplateBannerService)();
    const cards = yield (0, Cards_Service_1.createTemplateCardsService)(cardText);
    const exp = yield (0, Experience_Service_1.createTemplateExpService)();
    const growth = yield (0, Growth_Service_1.createTemplateGrowthService)();
    const about = yield (0, About_Service_1.createTemplateAboutService)();
    const template = yield TemplateContent_Model_1.TemplateContentModel.create({
        tabName: "6475c94f9295c30418c077c8",
        sectionOne: banner._id,
        sectionTwo: cards,
        sectionThree: exp._id,
        sectionFour: growth._id,
        sectionFive: about._id,
        dietitian: userId,
    });
    return template;
});
exports.createNewTemplateContentService = createNewTemplateContentService;
const getSectionByUserIdService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const sections = yield TemplateContent_Model_1.TemplateContentModel.findOne({
        dietitian: new mongoose_1.Types.ObjectId(userId),
        isActive: true,
        isDeleted: false,
    }).select("sectionOne sectionThree sectionTwo sectionFour sectionFive");
    return sections;
});
exports.getSectionByUserIdService = getSectionByUserIdService;
const getSectionOneDataService = (userId, sectionId) => __awaiter(void 0, void 0, void 0, function* () {
    let section = [];
    if (sectionId.indexOf(",") == -1) {
        section = yield TemplateContent_Model_1.TemplateContentModel.aggregate([
            {
                $match: {
                    dietitian: new mongoose_1.Types.ObjectId(userId),
                    sectionOne: new mongoose_1.Types.ObjectId(sectionId),
                },
            },
            {
                $lookup: {
                    from: "templatebannersections",
                    localField: "sectionOne",
                    foreignField: "_id",
                    as: "sectionOne",
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
                                    {
                                        $addFields: {
                                            subHeading: "$subHeading.text",
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
                            $addFields: {
                                subHeading: "$text.subHeading",
                                text: "$text.text",
                            },
                        },
                    ],
                },
            },
            {
                $unwind: {
                    path: "$sectionOne",
                },
            },
            {
                $project: {
                    sectionOne: 1,
                },
            },
        ]);
    }
    return section;
});
exports.getSectionOneDataService = getSectionOneDataService;
const getSectionTwoDataService = (userId, sectionId) => __awaiter(void 0, void 0, void 0, function* () {
    const sectionIds = sectionId.split(",");
    let section = yield TemplateContent_Model_1.TemplateContentModel.aggregate([
        {
            $match: {
                dietitian: new mongoose_1.Types.ObjectId(userId),
                $and: [
                    {
                        sectionTwo: new mongoose_1.Types.ObjectId(sectionIds[0]),
                    },
                    {
                        sectionTwo: new mongoose_1.Types.ObjectId(sectionIds[1]),
                    },
                    {
                        sectionTwo: new mongoose_1.Types.ObjectId(sectionIds[2]),
                    },
                ],
            },
        },
        {
            $lookup: {
                from: "templatecardsections",
                localField: "sectionTwo",
                foreignField: "_id",
                as: "sectionTwo",
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
                                {
                                    $addFields: {
                                        subHeading: "$subHeading.text",
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
                        $addFields: {
                            subHeading: "$text.subHeading",
                            text: "$text.text",
                        },
                    },
                ],
            },
        },
        {
            $project: {
                sectionTwo: 1,
            },
        },
    ]);
    return section;
});
exports.getSectionTwoDataService = getSectionTwoDataService;
const getSectionThreeDataService = (userId, sectionId) => __awaiter(void 0, void 0, void 0, function* () {
    let section = yield TemplateContent_Model_1.TemplateContentModel.aggregate([
        {
            $match: {
                dietitian: new mongoose_1.Types.ObjectId(userId),
                sectionThree: new mongoose_1.Types.ObjectId(sectionId),
            },
        },
        {
            $lookup: {
                from: "templateexperiencesections",
                localField: "sectionThree",
                foreignField: "_id",
                as: "sectionThree",
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
                                {
                                    $addFields: {
                                        subHeading: "$subHeading.text",
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
                        $addFields: {
                            subHeading: "$text.subHeading",
                            text: "$text.text",
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
                                {
                                    $addFields: {
                                        subHeading: "$subHeading.text",
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
                    {
                        $addFields: {
                            imageSubHeading: "$imageText.subHeading",
                            imageText: "$imageText.text",
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$sectionThree",
            },
        },
        {
            $project: {
                sectionThree: 1,
            },
        },
    ]);
    return section;
});
exports.getSectionThreeDataService = getSectionThreeDataService;
const getSectionFourDataService = (userId, sectionId) => __awaiter(void 0, void 0, void 0, function* () {
    let section = yield TemplateContent_Model_1.TemplateContentModel.aggregate([
        {
            $match: {
                dietitian: new mongoose_1.Types.ObjectId(userId),
                sectionFour: new mongoose_1.Types.ObjectId(sectionId),
            },
        },
        {
            $lookup: {
                from: "templategrowthsections",
                localField: "sectionFour",
                foreignField: "_id",
                as: "sectionFour",
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
                                {
                                    $addFields: {
                                        subHeading: "$subHeading.text",
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
                        $addFields: {
                            subHeading: "$text.subHeading",
                            text: "$text.text",
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$sectionFour",
            },
        },
        {
            $project: {
                sectionFour: 1,
            },
        },
    ]);
    return section;
});
exports.getSectionFourDataService = getSectionFourDataService;
const getSectionFiveDataService = (userId, sectionId) => __awaiter(void 0, void 0, void 0, function* () {
    let section = yield TemplateContent_Model_1.TemplateContentModel.aggregate([
        {
            $match: {
                dietitian: new mongoose_1.Types.ObjectId(userId),
                sectionFive: new mongoose_1.Types.ObjectId(sectionId),
            },
        },
        {
            $lookup: {
                from: "templateaboutsections",
                localField: "sectionFive",
                foreignField: "_id",
                as: "sectionFive",
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
                            from: "templatecardsections",
                            localField: "cards",
                            foreignField: "_id",
                            as: "cards",
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
                                            {
                                                $addFields: {
                                                    subHeading: "$subHeading.text",
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
                                    $addFields: {
                                        subHeading: "$text.subHeading",
                                        text: "$text.text",
                                    },
                                },
                            ],
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
                                {
                                    $addFields: {
                                        subHeading: "$subHeading.text",
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
                        $addFields: {
                            subHeading: "$text.subHeading",
                            text: "$text.text",
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$sectionFive",
            },
        },
        {
            $project: {
                sectionFive: 1,
            },
        },
    ]);
    return section;
});
exports.getSectionFiveDataService = getSectionFiveDataService;
const getTemplateDataService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield TemplateContent_Model_1.TemplateContentModel.aggregate([
        {
            $match: {
                dietitian: new mongoose_1.Types.ObjectId(userId),
            },
        },
        {
            $lookup: {
                from: "dashboards",
                localField: "tabName",
                foreignField: "_id",
                as: "tabName",
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
                path: "$tabName",
            },
        },
        {
            $lookup: {
                from: "templatebannersections",
                localField: "sectionOne",
                foreignField: "_id",
                as: "sectionOne",
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
                                {
                                    $addFields: {
                                        subHeading: "$subHeading.text",
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
                        $addFields: {
                            subHeading: "$text.subHeading",
                            text: "$text.text",
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$sectionOne",
            },
        },
        {
            $lookup: {
                from: "templatecardsections",
                localField: "sectionTwo",
                foreignField: "_id",
                as: "sectionTwo",
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
                                {
                                    $addFields: {
                                        subHeading: "$subHeading.text",
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
                        $addFields: {
                            subHeading: "$text.subHeading",
                            text: "$text.text",
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: "templateexperiencesections",
                localField: "sectionThree",
                foreignField: "_id",
                as: "sectionThree",
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
                                {
                                    $addFields: {
                                        subHeading: "$subHeading.text",
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
                        $addFields: {
                            subHeading: "$text.subHeading",
                            text: "$text.text",
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
                                {
                                    $addFields: {
                                        subHeading: "$subHeading.text",
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
                    {
                        $addFields: {
                            imageSubHeading: "$imageText.subHeading",
                            imageText: "$imageText.text",
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$sectionThree",
            },
        },
        {
            $lookup: {
                from: "templategrowthsections",
                localField: "sectionFour",
                foreignField: "_id",
                as: "sectionFour",
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
                                {
                                    $addFields: {
                                        subHeading: "$subHeading.text",
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
                        $addFields: {
                            subHeading: "$text.subHeading",
                            text: "$text.text",
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$sectionFour",
            },
        },
        {
            $lookup: {
                from: "templateaboutsections",
                localField: "sectionFive",
                foreignField: "_id",
                as: "sectionFive",
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
                            from: "templatecardsections",
                            localField: "cards",
                            foreignField: "_id",
                            as: "cards",
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
                                            {
                                                $addFields: {
                                                    subHeading: "$subHeading.text",
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
                                    $addFields: {
                                        subHeading: "$text.subHeading",
                                        text: "$text.text",
                                    },
                                },
                            ],
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
                                {
                                    $addFields: {
                                        subHeading: "$subHeading.text",
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
                        $addFields: {
                            subHeading: "$text.subHeading",
                            text: "$text.text",
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$sectionFive",
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
                    {
                        $project: {
                            password: 0,
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
                path: "$dietitian",
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
    return data;
});
exports.getTemplateDataService = getTemplateDataService;
