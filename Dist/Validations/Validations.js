"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorQueryErrorMessage = exports.validatorErrorMessage = void 0;
const StatusCodes_1 = __importDefault(require("../Constants/StatusCodes"));
const Response_helper_1 = require("../Helper/Response.helper");
const ResponseMessage_1 = __importDefault(require("../Constants/ResponseMessage"));
//* <---------------------------------------------Validator Error Message------------------------------------------>
const validatorErrorMessage = (isValid, res) => {
    return (0, Response_helper_1.errorResponse)(res, {
        statusCode: StatusCodes_1.default.BAD_REQUEST,
        message: ResponseMessage_1.default.INVALID_PARAMS,
        errors: isValid.error.details[0].message,
    });
};
exports.validatorErrorMessage = validatorErrorMessage;
//* <---------------------------------------------Validator Query Error Message------------------------------------------>
const validatorQueryErrorMessage = (isValid, res) => {
    return (0, Response_helper_1.errorResponse)(res, {
        statusCode: StatusCodes_1.default.BAD_REQUEST,
        message: ResponseMessage_1.default.INVALID_QUERY_PARAMS,
        errors: isValid.error.details[0].message,
    });
};
exports.validatorQueryErrorMessage = validatorQueryErrorMessage;
