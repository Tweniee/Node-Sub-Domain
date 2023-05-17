"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commonOptions_1 = require("../Constants/commonOptions");
const EnquirySchema = new mongoose_1.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        require: true,
    },
    goal: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Service",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    isAnswered: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    versionKey: false,
});
EnquirySchema.add(commonOptions_1.commonOptions);
// Create and export the Enquiry model
exports.default = (0, mongoose_1.model)("Enquiry", EnquirySchema);
