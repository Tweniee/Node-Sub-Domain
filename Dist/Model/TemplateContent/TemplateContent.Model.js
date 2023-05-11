"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commonOptions_1 = require("../Constants/commonOptions");
// Define the Mongoose schema
const templateContentInfoSchema = new mongoose_1.Schema({
    tabName: {
        type: mongoose_1.Types.ObjectId,
        ref: "Dashboard",
        required: true,
    },
    parentTab: {
        type: mongoose_1.Types.ObjectId,
        ref: "templateContent",
        required: false,
    },
    dietitian: {
        type: mongoose_1.Types.ObjectId,
        ref: "users",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    subTitle: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
templateContentInfoSchema.add(commonOptions_1.commonOptions);
// Define the Mongoose model for the collection
exports.default = (0, mongoose_1.model)("templateContent", templateContentInfoSchema);
