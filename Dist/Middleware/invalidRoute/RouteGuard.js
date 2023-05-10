"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidRouteHandlerMiddleware = void 0;
const StatusCodes_1 = __importDefault(require("../../Constants/StatusCodes"));
const Response_helper_1 = require("../../Helper/Response.helper");
const ResponseMessage_1 = __importDefault(require("../../Constants/ResponseMessage"));
// <------------------------------------------Invalid Routes Middleware-------------------------------->
const invalidRouteHandlerMiddleware = (req, res, next) => {
    try {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.NOT_FOUND,
            message: ResponseMessage_1.default.INVALID_ROUTE,
            errors: `Cannot find ${req.method} ${req.url}`,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.invalidRouteHandlerMiddleware = invalidRouteHandlerMiddleware;
