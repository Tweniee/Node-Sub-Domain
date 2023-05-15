"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTabNameValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const Validations_1 = require("../Validations");
//* <---------------------------------------Check Tab Name------------------------------------------------->
function checkTabNameValidation(req, res, next) {
    try {
        const schema = joi_1.default.object({
            tabName: joi_1.default.string().hex().length(24).required(),
        });
        const isValid = schema.validate(req.query);
        if (isValid.error) {
            return (0, Validations_1.validatorQueryErrorMessage)(isValid, res);
        }
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.checkTabNameValidation = checkTabNameValidation;
