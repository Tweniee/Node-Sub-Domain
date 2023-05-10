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
exports.loginController = void 0;
const ResponseMessage_1 = __importDefault(require("../../Constants/ResponseMessage"));
const StatusCodes_1 = __importDefault(require("../../Constants/StatusCodes"));
const Response_helper_1 = require("../../Helper/Response.helper");
const authMiddleware_1 = require("../../Middleware/Auth/authMiddleware");
const passwordMiddleware_1 = require("../../Middleware/Password/passwordMiddleware");
const User_service_1 = require("../../Service/Users/User.service");
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    //*checking if email already exists
    const isEmailExist = yield (0, User_service_1.isUserEmailAlreadyExistService)(email);
    //*return error if email is available
    if (isEmailExist.length == 0) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.FORBIDDEN,
            message: ResponseMessage_1.default.EMAIL_DOES_NOT_EXIST,
            errors: {},
        });
    }
    //*check if the password is correct
    const isPasswordMatched = yield (0, passwordMiddleware_1.comparePassword)(password, isEmailExist[0].password);
    //*returning error if password doesn't match
    if (!isPasswordMatched) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.FORBIDDEN,
            message: ResponseMessage_1.default.INCORRECT_PASSWORD,
            errors: {},
        });
    }
    //*success
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.USER_VERIFIED,
        data: { token: (0, authMiddleware_1.createJWTMiddleware)(isEmailExist[0]._id) },
    });
});
exports.loginController = loginController;
