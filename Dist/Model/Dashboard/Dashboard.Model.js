"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commonOptions_1 = require("../Constants/commonOptions");
const dashboardSchema = new mongoose_1.Schema({
    role: [{ type: mongoose_1.Types.ObjectId, ref: "Role", required: true }],
    image: { type: String, required: true },
    name: { type: String, required: true },
    permissionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Permission",
        required: true,
    },
    route: {
        type: String,
        required: true,
    },
}, { timestamps: true, versionKey: false });
dashboardSchema.add(commonOptions_1.commonOptions);
exports.default = (0, mongoose_1.model)("Dashboard", dashboardSchema);
