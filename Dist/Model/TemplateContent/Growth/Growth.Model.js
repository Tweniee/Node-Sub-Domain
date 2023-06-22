"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateGrowthSectionModel = void 0;
const mongoose_1 = require("mongoose");
const commonOptions_1 = require("../../Constants/commonOptions");
// Define the Mongoose schema for templateGrowthSection
const templateGrowthSectionSchema = new mongoose_1.Schema({
    text: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "templateText",
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    cardImage: {
        type: String,
        required: true,
    },
    bulletPoints: {
        type: String,
        required: true,
    },
    bulletIcons: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
templateGrowthSectionSchema.add(commonOptions_1.commonOptions);
// Create and export the Mongoose model for templateGrowthSection
const TemplateGrowthSectionModel = (0, mongoose_1.model)("templateGrowthSection", templateGrowthSectionSchema);
exports.TemplateGrowthSectionModel = TemplateGrowthSectionModel;
