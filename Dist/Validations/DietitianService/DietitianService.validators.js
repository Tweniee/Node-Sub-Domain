"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUpdateDietitianServiceValidation = exports.checkDietitianServiceValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const Validations_1 = require("../Validations");
//* <---------------------------------------Dietitian Service Validation------------------------------------------------->
function checkDietitianServiceValidation(req, res, next) {
    try {
        const schema = joi_1.default.object({
            tabName: joi_1.default.string().hex().length(24).required(),
            serviceName: joi_1.default.string().hex().length(24).required(),
            description: joi_1.default.string().required(),
            price: joi_1.default.number().positive().required(),
            durationInMinutes: joi_1.default.number().positive().required(),
            numberOfSessionPerWeek: joi_1.default.number().positive().required(),
            totalWeekForSession: joi_1.default.number().positive().required(),
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
exports.checkDietitianServiceValidation = checkDietitianServiceValidation;
//* <---------------------------------------Update Dietitian Service Validation------------------------------------------------->
function checkUpdateDietitianServiceValidation(req, res, next) {
    try {
        const schema = joi_1.default.object({
            tabName: joi_1.default.string().hex().length(24).required(),
            serviceId: joi_1.default.string().hex().length(24).required(),
            description: joi_1.default.string().required(),
            price: joi_1.default.number().positive().required(),
            durationInMinutes: joi_1.default.number().positive().required(),
            numberOfSessionPerWeek: joi_1.default.number().positive().required(),
            totalWeekForSession: joi_1.default.number().positive().required(),
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
exports.checkUpdateDietitianServiceValidation = checkUpdateDietitianServiceValidation;
