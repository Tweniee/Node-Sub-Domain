"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateCardSectionModel = void 0;
const mongoose_1 = require("mongoose");
const commonOptions_1 = require("../../Constants/commonOptions");
// Mongoose schema
const templateCardSectionSchema = new mongoose_1.Schema({
    icon: { type: String, required: true },
    text: { type: mongoose_1.Types.ObjectId, ref: "TemplateText", required: true },
}, {
    timestamps: true,
    versionKey: false,
});
templateCardSectionSchema.add(commonOptions_1.commonOptions);
const TemplateCardSectionModel = (0, mongoose_1.model)("TemplateCardSection", templateCardSectionSchema);
exports.TemplateCardSectionModel = TemplateCardSectionModel;
