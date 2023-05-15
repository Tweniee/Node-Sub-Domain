"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUpdateTemplateContentValidation = exports.checkCreateTemplateContentValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const Validations_1 = require("../Validations");
//* <---------------------------------------Check Template Content Create------------------------------------------------->
function checkCreateTemplateContentValidation(req, res, next) {
    try {
        const schema = joi_1.default.object({
            tabName: joi_1.default.string().hex().length(24).required(),
            parentTab: joi_1.default.string().hex().length(24).allow(null).optional(),
            title: joi_1.default.string().required(),
            subTitle: joi_1.default.string().optional(),
            description: joi_1.default.string().required(),
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
exports.checkCreateTemplateContentValidation = checkCreateTemplateContentValidation;
//* <---------------------------------------Check Template Content Update------------------------------------------------->
function checkUpdateTemplateContentValidation(req, res, next) {
    try {
        const schema = joi_1.default.object({
            tabName: joi_1.default.string().hex().length(24).required(),
            contentId: joi_1.default.string().hex().length(24).required(),
            title: joi_1.default.string().required(),
            description: joi_1.default.string().required(),
            subTitle: joi_1.default.string().optional(),
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
exports.checkUpdateTemplateContentValidation = checkUpdateTemplateContentValidation;
