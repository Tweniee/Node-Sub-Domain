"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commonOptions_1 = require("../Constants/commonOptions");
const RoleSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true, versionKey: false });
RoleSchema.add(commonOptions_1.commonOptions);
exports.default = (0, mongoose_1.model)("Role", RoleSchema);
