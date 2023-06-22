"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateBannerSectionModel = void 0;
const mongoose_1 = require("mongoose");
const commonOptions_1 = require("../../Constants/commonOptions");
// Schema
const TemplateBannerSectionSchema = new mongoose_1.Schema({
    bg_Image: {
        type: String,
        required: true
    },
    text: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'templateText',
        required: true
    }
}, {
    timestamps: true,
    versionKey: false,
});
TemplateBannerSectionSchema.add(commonOptions_1.commonOptions);
// Model
const TemplateBannerSectionModel = (0, mongoose_1.model)('templateBannerSection', TemplateBannerSectionSchema);
exports.TemplateBannerSectionModel = TemplateBannerSectionModel;
