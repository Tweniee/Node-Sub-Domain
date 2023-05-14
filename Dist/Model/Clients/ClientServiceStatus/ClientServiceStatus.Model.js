"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UniqueValues_1 = __importDefault(require("../../../Constants/UniqueValues"));
const commonOptions_1 = require("../../Constants/commonOptions");
const ClientServiceSchema = new mongoose_1.Schema({
    client_id: { type: mongoose_1.Types.ObjectId, required: true, ref: "Client" },
    clientUserId: { type: mongoose_1.Types.ObjectId, ref: "users", required: true },
    dietitianUserId: { type: mongoose_1.Types.ObjectId, ref: "users", required: true },
    service_id: { type: mongoose_1.Types.ObjectId, required: true, ref: "Service" },
    subscription: {
        type: String,
        enum: UniqueValues_1.default.CLIENT_SERVICE_SERVICE_ENUM,
    },
}, { timestamps: true, versionKey: false });
ClientServiceSchema.add(commonOptions_1.commonOptions);
exports.default = (0, mongoose_1.model)("clientService_Status", ClientServiceSchema);
