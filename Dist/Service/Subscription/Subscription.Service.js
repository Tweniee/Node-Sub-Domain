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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubscriptionPlanService = exports.getAllSubscriptionPlanService = exports.getSingleSubscriptionPlanService = exports.updateSubscriptionPlanService = exports.createSubscriptionPlanService = void 0;
const mongoose_1 = require("mongoose");
const Index_1 = require("../../Model/Index");
const createSubscriptionPlanService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const subscriptionPlan = yield Index_1.SubscriptionModel.create(body);
    return subscriptionPlan;
});
exports.createSubscriptionPlanService = createSubscriptionPlanService;
const updateSubscriptionPlanService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { planId, tabName, name, description, currency, price, duration } = body;
    const updatedSubscriptionPlan = yield Index_1.SubscriptionModel.findOneAndUpdate({
        _id: new mongoose_1.Types.ObjectId(planId),
    }, { $set: { tabName, name, description, currency, price, duration } }, { new: true });
    return updatedSubscriptionPlan;
});
exports.updateSubscriptionPlanService = updateSubscriptionPlanService;
const getSingleSubscriptionPlanService = (planId) => __awaiter(void 0, void 0, void 0, function* () {
    const subscriptionPlan = yield Index_1.SubscriptionModel.aggregate([
        {
            $match: {
                _id: new mongoose_1.Types.ObjectId(planId),
                isActive: true,
                isDeleted: false,
            },
        },
        {
            $project: {
                isActive: 0,
                isDeleted: 0,
                createdAt: 0,
                updatedAt: 0,
            },
        },
    ]);
    return subscriptionPlan;
});
exports.getSingleSubscriptionPlanService = getSingleSubscriptionPlanService;
const getAllSubscriptionPlanService = () => __awaiter(void 0, void 0, void 0, function* () {
    const subscriptionPlan = yield Index_1.SubscriptionModel.aggregate([
        {
            $match: {
                isActive: true,
                isDeleted: false,
            },
        },
        {
            $project: {
                isActive: 0,
                isDeleted: 0,
                createdAt: 0,
                updatedAt: 0,
            },
        },
    ]);
    return subscriptionPlan;
});
exports.getAllSubscriptionPlanService = getAllSubscriptionPlanService;
const deleteSubscriptionPlanService = (planId) => __awaiter(void 0, void 0, void 0, function* () {
    const subscriptionPlan = yield Index_1.SubscriptionModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(planId) }, { $set: { isActive: false, isDeleted: true } }, { new: true });
    return subscriptionPlan;
});
exports.deleteSubscriptionPlanService = deleteSubscriptionPlanService;
