"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDashboardPropertyValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const Validations_1 = require("../Validations");
const mongoose_1 = require("mongoose");
//* <---------------------------------------Check Dashboard Property Create------------------------------------------------->
function checkDashboardPropertyValidation(req, res, next) {
    try {
        const schema = joi_1.default.object({
            role: joi_1.default.array()
                .items(joi_1.default.string().valid(mongoose_1.Types.ObjectId.toString()))
                .required(),
            name: joi_1.default.string().required(),
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
