"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commonOptions_1 = require("../../Constants/commonOptions");
// Mongoose schema
const TemplateAboutSectionSchema = new mongoose_1.Schema({
    text: { type: mongoose_1.Schema.Types.ObjectId, ref: "templateText", required: true },
    cards: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "templateBannerCards" }],
}, {
    timestamps: true,
    versionKey: false,
});
TemplateAboutSectionSchema.add(commonOptions_1.commonOptions);
const TemplateAboutSectionModel = (0, mongoose_1.model)("TemplateAboutSection", TemplateAboutSectionSchema);
exports.default = TemplateAboutSectionModel;
