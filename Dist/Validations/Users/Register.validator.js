"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const Validations_1 = require("../Validations");
const ResponseMessage_1 = __importDefault(require("../../Constants/ResponseMessage"));
const UniqueValues_1 = __importDefault(require("../../Constants/UniqueValues"));
//* <---------------------------------------Register Validation------------------------------------------------->
function registerValidation(req, res, next) {
    try {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        const schema = joi_1.default.object({
            firstName: joi_1.default.string().required(),
            lastName: joi_1.default.string().required(),
            email: joi_1.default.string().email().required(),
            sessionStartTime: joi_1.default.string().required(),
            availableDays: joi_1.default.array()
                .items(joi_1.default.string().valid(UniqueValues_1.default.MONDAY, UniqueValues_1.default.TUESDAY, UniqueValues_1.default.WEDNESDAY, UniqueValues_1.default.THURSDAY, UniqueValues_1.default.FRIDAY, UniqueValues_1.default.SATURDAY, UniqueValues_1.default.SUNDAY, UniqueValues_1.default.SMALL_MONDAY, UniqueValues_1.default.SMALL_TUESDAY, UniqueValues_1.default.SMALL_WEDNESDAY, UniqueValues_1.default.SMALL_THURSDAY, UniqueValues_1.default.SMALL_FRIDAY, UniqueValues_1.default.SMALL_SATURDAY, UniqueValues_1.default.SMALL_SUNDAY))
                .required(),
            sessionEndTime: joi_1.default.string().required(),
            role: joi_1.default.string()
                .required()
                .valid(UniqueValues_1.default.ADMIN, UniqueValues_1.default.SUPER_ADMIN, UniqueValues_1.default.CLIENT, UniqueValues_1.default.DIETITIAN),
            password: joi_1.default.string().required().regex(passwordRegex).messages({
                "string.pattern.base": ResponseMessage_1.default.INVALID_PASSWORD,
            }),
            dateOfBirth: joi_1.default.date().required(),
            username: joi_1.default.string().required(),
            phoneNumber: joi_1.default.string().required(),
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
exports.registerValidation = registerValidation;
