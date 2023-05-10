"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUpdatePermissionValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const Validations_1 = require("../../Validations");
//* <---------------------------------------Check Permissions Update------------------------------------------------->
function checkUpdatePermissionValidation(req, res, next) {
    try {
        // *valid(Types.ObjectId.toString()* //
        const schema = joi_1.default.object({
            permissionId: joi_1.default.string().hex().length(24).required(),
            canCreate: joi_1.default.boolean().required(),
            canRead: joi_1.default.boolean().required(),
            canUpdate: joi_1.default.boolean().required(),
            canDelete: joi_1.default.boolean().required(),
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
exports.checkUpdatePermissionValidation = checkUpdatePermissionValidation;
