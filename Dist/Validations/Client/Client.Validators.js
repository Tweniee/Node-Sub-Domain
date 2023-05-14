"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkClientServiceValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const Validations_1 = require("../Validations");
//* <---------------------------------------Check Client Service Create------------------------------------------------->
function checkClientServiceValidation(req, res, next) {
    try {
        const schema = joi_1.default.object({
            dietitian: joi_1.default.string().hex().length(24).required(),
            goal: joi_1.default.string().hex().length(24).required(),
            name: joi_1.default.string().required(),
            age: joi_1.default.number().integer().required(),
            gender: joi_1.default.string().required(),
            activityLevel: joi_1.default.string().required(),
            height: joi_1.default.number().required(),
            weight: joi_1.default.number().required(),
            medicalConditions: joi_1.default.array().items(joi_1.default.string()).optional(),
            allergies: joi_1.default.array().items(joi_1.default.string()).optional(),
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
exports.checkClientServiceValidation = checkClientServiceValidation;
