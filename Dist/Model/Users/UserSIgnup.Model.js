"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commonOptions_1 = require("../Constants/commonOptions");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    role: {
        type: mongoose_1.Types.ObjectId,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false,
});
userSchema.add(commonOptions_1.commonOptions);
exports.default = (0, mongoose_1.model)("users", userSchema);
