"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUpdate_DashboardPropertyValidation = exports.checkDashboardPropertyValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const Validations_1 = require("../Validations");
//* <---------------------------------------Check Dashboard Property Create------------------------------------------------->
function checkDashboardPropertyValidation(req, res, next) {
    try {
        // *valid(Types.ObjectId.toString()* //
        const schema = joi_1.default.object({
            image: joi_1.default.string().required(),
            role: joi_1.default.array().items(joi_1.default.string().hex().length(24)).required(),
            name: joi_1.default.string().required(),
            route: joi_1.default.string().required(),
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
exports.checkDashboardPropertyValidation = checkDashboardPropertyValidation;
//* <---------------------------------------Check Dashboard Property Update------------------------------------------------->
function checkUpdate_DashboardPropertyValidation(req, res, next) {
    try {
        // *valid(Types.ObjectId.toString()* //
        const schema = joi_1.default.object({
            image: joi_1.default.string().required(),
            propertyId: joi_1.default.string().hex().length(24).required(),
            role: joi_1.default.array().items(joi_1.default.string().hex().length(24)).required(),
            name: joi_1.default.string().required(),
            route: joi_1.default.string().required(),
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
exports.checkUpdate_DashboardPropertyValidation = checkUpdate_DashboardPropertyValidation;
