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
exports.updateSubscriptionPlanController = exports.deleteSubscriptionPlanController = exports.getAllSubscriptionPlanController = exports.getSubscriptionPlanByIdController = exports.createSubscriptionPlanController = void 0;
const mongoose_1 = require("mongoose");
const Permissions_Helper_1 = require("../../Helper/Permissions/Permissions.Helper");
const UniqueValues_1 = __importDefault(require("../../Constants/UniqueValues"));
const Response_helper_1 = require("../../Helper/Response.helper");
const StatusCodes_1 = __importDefault(require("../../Constants/StatusCodes"));
const ResponseMessage_1 = __importDefault(require("../../Constants/ResponseMessage"));
const Subscription_Service_1 = require("../../Service/Subscription/Subscription.Service");
const createSubscriptionPlanController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tabName, name, description, currency, price, duration } = req.body;
    // *getting this userId from token
    const userId = new mongoose_1.Types.ObjectId(req === null || req === void 0 ? void 0 : req.userId);
    const hasPermission = yield (0, Permissions_Helper_1.checkForPermissionService)(String(tabName), userId, UniqueValues_1.default.CREATE_PERMISSION);
    if (!hasPermission) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.UNAUTHORIZED,
            message: ResponseMessage_1.default.INVALID_ACTION,
            errors: {},
        });
    }
    const subscriptionPlan = yield (0, Subscription_Service_1.createSubscriptionPlanService)({
        tabName,
        name,
        description,
        currency,
        price,
        duration,
    });
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.CREATED_SUBSCRIPTION_PLAN,
        data: subscriptionPlan,
    });
});
exports.createSubscriptionPlanController = createSubscriptionPlanController;
const getSubscriptionPlanByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tabName } = req.query;
    // *getting this userId from token
    const userId = new mongoose_1.Types.ObjectId(req === null || req === void 0 ? void 0 : req.userId);
    const hasPermission = yield (0, Permissions_Helper_1.checkForPermissionService)(String(tabName), userId, UniqueValues_1.default.READ_PERMISSION);
    if (!hasPermission) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.UNAUTHORIZED,
            message: ResponseMessage_1.default.INVALID_ACTION,
            errors: {},
        });
    }
    const { planId } = req.params;
    const subscriptionPlan = yield (0, Subscription_Service_1.getSingleSubscriptionPlanService)(planId);
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.SUCCESS,
        data: subscriptionPlan,
    });
});
exports.getSubscriptionPlanByIdController = getSubscriptionPlanByIdController;
const getAllSubscriptionPlanController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tabName } = req.query;
    // *getting this userId from token
    const userId = new mongoose_1.Types.ObjectId(req === null || req === void 0 ? void 0 : req.userId);
    const hasPermission = yield (0, Permissions_Helper_1.checkForPermissionService)(String(tabName), userId, UniqueValues_1.default.READ_PERMISSION);
    if (!hasPermission) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.UNAUTHORIZED,
            message: ResponseMessage_1.default.INVALID_ACTION,
            errors: {},
        });
    }
    const subscriptionPlan = yield (0, Subscription_Service_1.getAllSubscriptionPlanService)();
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.SUCCESS,
        data: subscriptionPlan,
    });
});
exports.getAllSubscriptionPlanController = getAllSubscriptionPlanController;
const deleteSubscriptionPlanController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tabName } = req.query;
    // *getting this userId from token
    const userId = new mongoose_1.Types.ObjectId(req === null || req === void 0 ? void 0 : req.userId);
    const hasPermission = yield (0, Permissions_Helper_1.checkForPermissionService)(String(tabName), userId, UniqueValues_1.default.DELETE_PERMISSION);
    if (!hasPermission) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.UNAUTHORIZED,
            message: ResponseMessage_1.default.INVALID_ACTION,
            errors: {},
        });
    }
    const { planId } = req.params;
    const isValid = yield (0, Subscription_Service_1.getSingleSubscriptionPlanService)(planId);
    if (isValid.length == 0) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.NOT_FOUND,
            message: ResponseMessage_1.default.INVALID_PARAMS,
            errors: {},
        });
    }
    const subscriptionPlan = yield (0, Subscription_Service_1.deleteSubscriptionPlanService)(new mongoose_1.Types.ObjectId(planId));
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.CREATED_SUBSCRIPTION_PLAN,
        data: subscriptionPlan,
    });
});
exports.deleteSubscriptionPlanController = deleteSubscriptionPlanController;
const updateSubscriptionPlanController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { planId, tabName, name, description, currency, price, duration } = req.body;
    // *getting this userId from token
    const userId = new mongoose_1.Types.ObjectId(req === null || req === void 0 ? void 0 : req.userId);
    const hasPermission = yield (0, Permissions_Helper_1.checkForPermissionService)(String(tabName), userId, UniqueValues_1.default.UPDATE_PERMISSION);
    if (!hasPermission) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.UNAUTHORIZED,
            message: ResponseMessage_1.default.INVALID_ACTION,
            errors: {},
        });
    }
    const isValid = yield (0, Subscription_Service_1.getSingleSubscriptionPlanService)(planId);
    if (isValid.length == 0) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.NOT_FOUND,
            message: ResponseMessage_1.default.INVALID_PARAMS,
            errors: {},
        });
    }
    const subscriptionPlan = yield (0, Subscription_Service_1.updateSubscriptionPlanService)({
        planId,
        tabName,
        name,
        description,
        currency,
        price,
        duration,
    });
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.CREATED_SUBSCRIPTION_PLAN,
        data: subscriptionPlan,
    });
});
exports.updateSubscriptionPlanController = updateSubscriptionPlanController;
