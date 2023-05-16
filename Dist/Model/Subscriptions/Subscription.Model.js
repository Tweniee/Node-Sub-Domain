"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commonOptions_1 = require("../Constants/commonOptions");
const UniqueValues_1 = __importDefault(require("../../Constants/UniqueValues"));
var SubscriptionDuration;
(function (SubscriptionDuration) {
    SubscriptionDuration["ONE_MONTH"] = "ONE_MONTH";
    SubscriptionDuration["THREE_MONTHS"] = "THREE_MONTHS";
    SubscriptionDuration["SIX_MONTHS"] = "SIX_MONTHS";
    SubscriptionDuration["ONE_YEAR"] = "ONE_YEAR";
})(SubscriptionDuration || (SubscriptionDuration = {}));
const SubscriptionPlanSchema = new mongoose_1.Schema({
    tabName: { type: mongoose_1.Types.ObjectId, ref: "dashboard", required: true },
    name: { type: String, required: true },
    // * description is a innerHTML
    description: { type: String, required: true },
    currency: { type: String, required: true },
    price: { type: Number, required: true },
    duration: {
        type: String,
        enum: Object.values(SubscriptionDuration),
        required: true,
    },
    active: { type: Boolean, default: true },
}, {
    timestamps: true,
    versionKey: false,
});
SubscriptionPlanSchema.add(commonOptions_1.commonOptions);
// Define pre-save hook
SubscriptionPlanSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = this.constructor;
        const count = yield model.countDocuments();
        const limit = Number(UniqueValues_1.default.SUBSCRIPTION_LIMIT);
        if (count >= limit) {
            throw new Error("Document limit exceeded.");
        }
        next();
    });
});
exports.default = (0, mongoose_1.model)("subscription_plans", SubscriptionPlanSchema);
