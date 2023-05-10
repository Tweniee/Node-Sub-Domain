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
exports.getUserByUserIdController = exports.getAllUsersController = void 0;
const mongoose_1 = require("mongoose");
const ResponseMessage_1 = __importDefault(require("../../Constants/ResponseMessage"));
const StatusCodes_1 = __importDefault(require("../../Constants/StatusCodes"));
const Response_helper_1 = require("../../Helper/Response.helper");
const Users_Service_1 = require("../../Service/Users/Users.Service");
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, Users_Service_1.getAllUserService)();
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.SUCCESS,
        data: users,
    });
});
exports.getAllUsersController = getAllUsersController;
const getUserByUserIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const user = yield (0, Users_Service_1.getSingleUserService)(new mongoose_1.Types.ObjectId(userId));
    if (user.length == 0) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.NOT_FOUND,
            message: ResponseMessage_1.default.NO_USER_FOUND,
            errors: {},
        });
    }
    return (0, Response_helper_1.successResponse)(res, { message: ResponseMessage_1.default.SUCCESS, data: user });
});
exports.getUserByUserIdController = getUserByUserIdController;
