"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCreateEnquiryValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const Validations_1 = require("../Validations");
//* <---------------------------------------Check Enquiry Create------------------------------------------------->
function checkCreateEnquiryValidation(req, res, next) {
    try {
        const schema = joi_1.default.object({
            userEmail: joi_1.default.string().email().required(),
            phoneNumber: joi_1.default.number().required(),
            goal: joi_1.default.string().hex().length(24).required(),
            message: joi_1.default.string().required(),
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
exports.checkCreateEnquiryValidation = checkCreateEnquiryValidation;
