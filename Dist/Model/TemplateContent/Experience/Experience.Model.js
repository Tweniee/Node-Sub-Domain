"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateExperienceSectionModel = void 0;
const mongoose_1 = require("mongoose");
const commonOptions_1 = require("../../Constants/commonOptions");
// Mongoose schema for templateExperienceSection
const templateExperienceSectionSchema = new mongoose_1.Schema({
    icon: { type: String, required: true },
    bg_Color: { type: String, required: true },
    text: { type: mongoose_1.Types.ObjectId, ref: "templateText", required: true },
    imageText: { type: mongoose_1.Types.ObjectId, ref: "templateText", required: true },
    cardImage: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false,
});
templateExperienceSectionSchema.add(commonOptions_1.commonOptions);
// Create and export the Mongoose model
const TemplateExperienceSectionModel = (0, mongoose_1.model)("templateExperienceSection", templateExperienceSectionSchema);
exports.TemplateExperienceSectionModel = TemplateExperienceSectionModel;
