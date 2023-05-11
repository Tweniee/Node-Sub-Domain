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
exports.createTemplateContentController = void 0;
const mongoose_1 = require("mongoose");
const ResponseMessage_1 = __importDefault(require("../../Constants/ResponseMessage"));
const Response_helper_1 = require("../../Helper/Response.helper");
const Template_Service_1 = require("../../Service/Template/Template.Service");
const UniqueValues_1 = __importDefault(require("../../Constants/UniqueValues"));
const StatusCodes_1 = __importDefault(require("../../Constants/StatusCodes"));
const createTemplateContentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // *getting this userId from token
    const userId = new mongoose_1.Types.ObjectId(req === null || req === void 0 ? void 0 : req.userId);
    // ! We Need to check if the user has the permission to Perform Action(Create) or not //
    const hasPermission = yield (0, Template_Service_1.checkForPermissionService)(userId, UniqueValues_1.default.CREATE_PERMISSION);
    if (!hasPermission) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.UNAUTHORIZED,
            message: ResponseMessage_1.default.INVALID_ACTION,
            errors: {},
        });
    }
    // * creating Template Content
    const { tabName, parentTab = null, title, subTitle, description } = req.body;
    const content = yield (0, Template_Service_1.createTemplateContentService)({
        tabName,
        parentTab,
        dietitian: userId,
        title,
        subTitle,
        description,
    });
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.CONTENT_CREATED_SUCCESSFULLY,
        data: content,
    });
});
exports.createTemplateContentController = createTemplateContentController;
