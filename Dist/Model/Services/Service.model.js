"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commonOptions_1 = require("../Constants/commonOptions");
const ServiceSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, default: "" },
    description: { type: String, required: true },
}, { timestamps: true, versionKey: false });
ServiceSchema.add(commonOptions_1.commonOptions);
// Create a model for the Service schema
const Service = mongoose_1.default.model("Service", ServiceSchema);
exports.default = Service;
