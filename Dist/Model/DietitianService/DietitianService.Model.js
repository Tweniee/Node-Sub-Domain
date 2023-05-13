"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const commonOptions_1 = require("../Constants/commonOptions");
// Define schema for DietitianService
const DietitianServiceSchema = new mongoose_1.Schema({
    tabName: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Dashboard",
        required: true,
    },
    dietitian: { type: mongoose_1.default.Types.ObjectId, ref: "users", required: true },
    serviceName: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Service",
        required: true,
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    durationInMinutes: { type: Number, required: true },
    // * durationInMinutes Field Allow Dietitian to set the time limit of the session they will take one on one with the client //
    availableDays: [{ type: String }],
    // * availableDays Field Allows the dietitian to set the days in a week of when they are available //
}, { timestamps: true, versionKey: false });
DietitianServiceSchema.add(commonOptions_1.commonOptions);
// Define and export DietitianService model
exports.default = mongoose_1.default.model("DietitianService", DietitianServiceSchema);
