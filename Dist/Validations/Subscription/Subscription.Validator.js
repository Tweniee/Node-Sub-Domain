"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPlanIdSubscriptionPlanValidation = exports.checkUpdateSubscriptionPlanValidation = exports.checkCreateSubscriptionPlanValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const Validations_1 = require("../Validations");
const UniqueValues_1 = __importDefault(require("../../Constants/UniqueValues"));
//* <---------------------------------------Check Subscription Plan Create------------------------------------------------->
function checkCreateSubscriptionPlanValidation(req, res, next) {
    try {
        const schema = joi_1.default.object({
            tabName: joi_1.default.string().hex().length(24).required(),
            name: joi_1.default.string().required(),
            description: joi_1.default.string().required(),
            currency: joi_1.default.string().required(),
            price: joi_1.default.number().required(),
            duration: joi_1.default.string()
                .valid(UniqueValues_1.default.ONE_MONTH, UniqueValues_1.default.THREE_MONTHS, UniqueValues_1.default.SIX_MONTHS, UniqueValues_1.default.ONE_YEAR)
                .required(),
        });
        const isValid = schema.validate(req.body);
        if (isValid.error) {
            return (0, Validations_1.validatorErrorMessage)(isValid, res);
        }
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.checkCreateSubscriptionPlanValidation = checkCreateSubscriptionPlanValidation;
//* <---------------------------------------Check Subscription Plan Update------------------------------------------------->
function checkUpdateSubscriptionPlanValidation(req, res, next) {
    try {
        const schema = joi_1.default.object({
            planId: joi_1.default.string().hex().length(24).required(),
            tabName: joi_1.default.string().hex().length(24).required(),
            name: joi_1.default.string().required(),
            description: joi_1.default.string().required(),
            currency: joi_1.default.string().required(),
            price: joi_1.default.number().required(),
            duration: joi_1.default.string()
                .valid(UniqueValues_1.default.ONE_MONTH, UniqueValues_1.default.THREE_MONTHS, UniqueValues_1.default.SIX_MONTHS, UniqueValues_1.default.ONE_YEAR)
                .required(),
        });
        const isValid = schema.validate(req.body);
        if (isValid.error) {
            return (0, Validations_1.validatorErrorMessage)(isValid, res);
        }
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.checkUpdateSubscriptionPlanValidation = checkUpdateSubscriptionPlanValidation;
//* <---------------------------------------Check Subscription Plan Plan Id------------------------------------------------->
function checkPlanIdSubscriptionPlanValidation(req, res, next) {
    try {
        const schema = joi_1.default.object({
            planId: joi_1.default.string().hex().length(24).required()
        });
        const isValid = schema.validate(req.params);
        if (isValid.error) {
            return (0, Validations_1.validatorErrorMessage)(isValid, res);
        }
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.checkPlanIdSubscriptionPlanValidation = checkPlanIdSubscriptionPlanValidation;
