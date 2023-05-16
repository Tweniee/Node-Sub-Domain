"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const mongoose_1 = require("mongoose");
const Users_Service_1 = require("../../Service/Users/Users.Service");
const Response_helper_1 = require("../../Helper/Response.helper");
const StatusCodes_1 = __importDefault(require("../../Constants/StatusCodes"));
const ResponseMessage_1 = __importDefault(require("../../Constants/ResponseMessage"));
function isAuthorized(userRole, allowedRoles) {
    return allowedRoles.includes(userRole);
}
function authorize(allowedRoles) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const { userId } = req;
        console.log(userId);
        const user = yield (0, Users_Service_1.getSingleUserService)(new mongoose_1.Types.ObjectId(userId));
        const role = user[0].role;
        console.log(role);
        const userRole = role;
        if (isAuthorized(userRole, allowedRoles)) {
            next(); // The user is authorized, continue with the next middleware function
        }
        else {
            (0, Response_helper_1.errorResponse)(res, {
                statusCode: StatusCodes_1.default.FORBIDDEN,
                message: ResponseMessage_1.default.INVALID_ROLE,
                errors: ResponseMessage_1.default.FORBIDDEN,
            }); // The user is not authorized, send a 403 Forbidden response
        }
    });
}
exports.authorize = authorize;
