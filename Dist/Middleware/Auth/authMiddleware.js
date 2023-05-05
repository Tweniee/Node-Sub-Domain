"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAuthMiddleware = exports.createJWTMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Response_helper_1 = require("../../Helper/Response.helper");
const StatusCodes_1 = __importDefault(require("../../Constants/StatusCodes"));
const ResponseMessage_1 = __importDefault(require("../../Constants/ResponseMessage"));
const Config_1 = require("../../Config");
const createJWTMiddleware = (userId, roleId) => {
    const payload = { userId, roleId };
    const secret = Config_1.JWT_KEY;
    return jsonwebtoken_1.default.sign(payload, secret);
};
exports.createJWTMiddleware = createJWTMiddleware;
const jwtAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.UNAUTHORIZED,
            message: ResponseMessage_1.default.NOT_TOKEN_PROVIDED,
            errors: {},
        });
    }
    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.UNAUTHORIZED,
            message: ResponseMessage_1.default.TOKEN_ERROR,
            errors: {},
        });
    }
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.UNAUTHORIZED,
            message: ResponseMessage_1.default.TOKEN_MALFORMATTED,
            errors: {},
        });
    }
    jsonwebtoken_1.default.verify(token, Config_1.JWT_KEY, (err, decoded) => {
        if (err) {
            return (0, Response_helper_1.errorResponse)(res, {
                statusCode: StatusCodes_1.default.UNAUTHORIZED,
                message: ResponseMessage_1.default.INVALID_TOKEN,
                errors: {},
            });
        }
        const { userId } = decoded;
        req.userId = userId;
        return next();
    });
};
exports.jwtAuthMiddleware = jwtAuthMiddleware;
