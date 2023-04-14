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
exports.checkUsernameController = exports.RegisterController = void 0;
const ResponseMessage_1 = __importDefault(require("../../Constants/ResponseMessage"));
const StatusCodes_1 = __importDefault(require("../../Constants/StatusCodes"));
const Response_helper_1 = require("../../Helper/Response.helper");
const Register_service_1 = require("../../Service/Register.service");
const User_service_1 = require("../../Service/User.service");
const RegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, email } = req.body;
    //*checking if email already exists
    const isEmailExist = yield (0, User_service_1.isUserEmailAlreadyExistService)(email);
    //*check if number already exists
    const isNumberExist = yield (0, User_service_1.isUserNumberAlreadyExistService)(phoneNumber);
    //* return error if email is available
    if (isEmailExist.length > 0) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.FORBIDDEN,
            message: ResponseMessage_1.default.EMAIL_ALREADY_EXIST,
            errors: {},
        });
        //* return error if number is available
    }
    else if (isNumberExist.length > 0) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.FORBIDDEN,
            message: ResponseMessage_1.default.NUMBER_ALREADY_EXIST,
            errors: {},
        });
    }
    //*register new user
    const user = yield (0, Register_service_1.registerService)(req);
    //*success
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.SUCCESSFULLY_REGISTERED,
        data: user,
    });
});
exports.RegisterController = RegisterController;
const checkUsernameController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    //*checking is there username is available for taking
    const isValid = yield (0, Register_service_1.checkUsernameService)(username);
    //*if the username is already taken (case insensitive)
    if (isValid.length > 0) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.BAD_REQUEST,
            message: ResponseMessage_1.default.USERNAME_ALREADY_EXISTS,
            errors: {},
        });
    }
    //*success
    return (0, Response_helper_1.successResponse)(res, { message: ResponseMessage_1.default.USERNAME_AVAILABLE });
});
exports.checkUsernameController = checkUsernameController;
