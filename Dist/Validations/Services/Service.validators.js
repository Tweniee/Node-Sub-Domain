"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFileUploadValidation = exports.checkUpdateServiceValidation = exports.checkCreateServiceValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const Validations_1 = require("../Validations");
//* <---------------------------------------Check Service Create------------------------------------------------->
function checkCreateServiceValidation(req, res, next) {
    try {
        const schema = joi_1.default.object({
            name: joi_1.default.string().required(),
            image: joi_1.default.string().optional(),
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
exports.checkCreateServiceValidation = checkCreateServiceValidation;
//* <---------------------------------------Check Service Update------------------------------------------------->
function checkUpdateServiceValidation(req, res, next) {
    try {
        const schema = joi_1.default.object({
            name: joi_1.default.string().required(),
            image: joi_1.default.string().optional(),
            description: joi_1.default.string().required(),
            serviceId: joi_1.default.string().hex().length(24).required(),
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
exports.checkUpdateServiceValidation = checkUpdateServiceValidation;
//* <---------------------------------------Check Service Create------------------------------------------------->
function checkFileUploadValidation(req, res, next) {
    try {
        console.log(req.files);
        const schema = joi_1.default.object({
            image: joi_1.default.object({
                name: joi_1.default.string().required(),
                mimetype: joi_1.default.string().valid("image/jpeg", "image/png").required(),
                size: joi_1.default.number().required(),
                data: joi_1.default.binary().required(),
                encoding: joi_1.default.string().required(),
                tempFilePath: joi_1.default.string().allow(""),
                truncated: joi_1.default.boolean().required(),
                md5: joi_1.default.string().required(),
                mv: joi_1.default.function().required(),
            }).required(),
        });
        const isValid = schema.validate(req.files);
        if (isValid.error) {
            return (0, Validations_1.validatorErrorMessage)(isValid, res);
        }
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.checkFileUploadValidation = checkFileUploadValidation;
