"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUpdateDietitianServiceValidation = exports.checkDietitianServiceValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const Validations_1 = require("../Validations");
const UniqueValues_1 = __importDefault(require("../../Constants/UniqueValues"));
//* <---------------------------------------Dietitian Service Validation------------------------------------------------->
function checkDietitianServiceValidation(req, res, next) {
    try {
        const schema = joi_1.default.object({
            tabName: joi_1.default.string().hex().length(24).required(),
            serviceName: joi_1.default.string().hex().length(24).required(),
            description: joi_1.default.string().required(),
            price: joi_1.default.number().positive().required(),
            durationInMinutes: joi_1.default.number().positive().required(),
            availableDays: joi_1.default.array()
                .items(joi_1.default.string().valid(UniqueValues_1.default.MONDAY, UniqueValues_1.default.TUESDAY, UniqueValues_1.default.WEDNESDAY, UniqueValues_1.default.THURSDAY, UniqueValues_1.default.FRIDAY, UniqueValues_1.default.SATURDAY, UniqueValues_1.default.SUNDAY, UniqueValues_1.default.SMALL_MONDAY, UniqueValues_1.default.SMALL_TUESDAY, UniqueValues_1.default.SMALL_WEDNESDAY, UniqueValues_1.default.SMALL_THURSDAY, UniqueValues_1.default.SMALL_FRIDAY, UniqueValues_1.default.SMALL_SATURDAY, UniqueValues_1.default.SMALL_SUNDAY))
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
            availableDays: joi_1.default.array()
                .items(joi_1.default.string().valid(UniqueValues_1.default.MONDAY, UniqueValues_1.default.TUESDAY, UniqueValues_1.default.WEDNESDAY, UniqueValues_1.default.THURSDAY, UniqueValues_1.default.FRIDAY, UniqueValues_1.default.SATURDAY, UniqueValues_1.default.SUNDAY, UniqueValues_1.default.SMALL_MONDAY, UniqueValues_1.default.SMALL_TUESDAY, UniqueValues_1.default.SMALL_WEDNESDAY, UniqueValues_1.default.SMALL_THURSDAY, UniqueValues_1.default.SMALL_FRIDAY, UniqueValues_1.default.SMALL_SATURDAY, UniqueValues_1.default.SMALL_SUNDAY))
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
exports.checkUpdateDietitianServiceValidation = checkUpdateDietitianServiceValidation;
