"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateContentModel = void 0;
const mongoose_1 = require("mongoose");
const commonOptions_1 = require("../Constants/commonOptions");
// Define the Mongoose schema
const templateContentInfoSchema = new mongoose_1.Schema({
    tabName: { type: mongoose_1.Schema.Types.ObjectId, ref: "dashboard", required: true },
    sectionOne: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "templateBannerSection",
        required: true,
    },
    sectionTwo: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "templateBannerCards",
            required: true,
        },
    ],
    sectionThree: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "templateExperienceSection",
        required: true,
    },
    sectionFour: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "templateGrowthSection",
        required: true,
    },
    sectionFive: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "templateAboutSection",
        required: true,
    },
    dietitian: { type: mongoose_1.Schema.Types.ObjectId, ref: "users", required: true },
}, {
    timestamps: true,
    versionKey: false,
});
templateContentInfoSchema.add(commonOptions_1.commonOptions);
// Define the Mongoose model for the collection
exports.TemplateContentModel = (0, mongoose_1.model)("templateContent", templateContentInfoSchema);
