"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commonOptions_1 = require("../../Constants/commonOptions");
const EnquiryRepliesSchema = new mongoose_1.Schema({
    // * We'll trigger the Email with a response from dietitian
    enquiryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Enquiry",
        required: true,
    },
    // * Who replied is userId
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
EnquiryRepliesSchema.add(commonOptions_1.commonOptions);
// Create and export the EnquiryReplies model
exports.default = (0, mongoose_1.model)("EnquiryReplies", EnquiryRepliesSchema);
