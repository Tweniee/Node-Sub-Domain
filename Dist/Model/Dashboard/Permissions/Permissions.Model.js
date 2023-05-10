"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commonOptions_1 = require("../../Constants/commonOptions");
const permissionSchema = new mongoose_1.Schema({
    canCreate: { type: Boolean, required: true, default: false },
    canRead: { type: Boolean, required: true, default: false },
    canUpdate: { type: Boolean, required: true, default: false },
    canDelete: { type: Boolean, required: true, default: false },
}, { timestamps: true, versionKey: false });
permissionSchema.add(commonOptions_1.commonOptions);
exports.default = (0, mongoose_1.model)("Permission", permissionSchema);
