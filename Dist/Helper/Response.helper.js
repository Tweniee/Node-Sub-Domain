"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const StatusCodes_1 = __importDefault(require("../Constants/StatusCodes"));
//* <--------------------------------SuccessResponse is used to send all successful response to client------------------------>
const successResponse = (res, { message, data = {} }) => {
    return res.status(StatusCodes_1.default.SUCCESS).json({
        success: true,
        message,
        body: data,
    });
};
exports.successResponse = successResponse;
//* <---------------------------------ErrorResponse is used to send all failure response to client---------------------------->
const errorResponse = (res, { statusCode, message, errors }) => {
    return res.status(statusCode).json({
        success: false,
        message,
        errors,
    });
};
exports.errorResponse = errorResponse;
