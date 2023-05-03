"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUpdateRoleValidation = exports.checkCreateRoleValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const Validations_1 = require("../Validations");
//* <---------------------------------------Check Role Create------------------------------------------------->
function checkCreateRoleValidation(req, res, next) {
    try {
        const schema = joi_1.default.object({
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
exports.checkCreateRoleValidation = checkCreateRoleValidation;
//* <---------------------------------------Check Role Update------------------------------------------------->
function checkUpdateRoleValidation(req, res, next) {
    try {
        const schema = joi_1.default.object({
            roleId: joi_1.default.string().hex().length(24).required(),
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
exports.checkUpdateRoleValidation = checkUpdateRoleValidation;
