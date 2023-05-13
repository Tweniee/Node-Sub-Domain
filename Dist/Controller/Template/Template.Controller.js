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
exports.restoreTemplateContentController = exports.deleteTemplateContentController = exports.updateTemplateContentController = exports.getAllTemplateContentController = exports.createTemplateContentController = void 0;
const mongoose_1 = require("mongoose");
const ResponseMessage_1 = __importDefault(require("../../Constants/ResponseMessage"));
const Response_helper_1 = require("../../Helper/Response.helper");
const Template_Service_1 = require("../../Service/Template/Template.Service");
const UniqueValues_1 = __importDefault(require("../../Constants/UniqueValues"));
const StatusCodes_1 = __importDefault(require("../../Constants/StatusCodes"));
const createTemplateContentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // *getting this userId from token
    const userId = new mongoose_1.Types.ObjectId(req === null || req === void 0 ? void 0 : req.userId);
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
        dietitian: userId,
        title,
        parentTab,
        subTitle,
        description,
    }, parentTab);
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.CONTENT_CREATED_SUCCESSFULLY,
        data: content,
    });
});
exports.createTemplateContentController = createTemplateContentController;
const getAllTemplateContentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // *getting this userId from token
    const userId = new mongoose_1.Types.ObjectId(req === null || req === void 0 ? void 0 : req.userId);
    const hasPermission = yield (0, Template_Service_1.checkForPermissionService)(userId, UniqueValues_1.default.READ_PERMISSION);
    if (!hasPermission) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.UNAUTHORIZED,
            message: ResponseMessage_1.default.INVALID_ACTION,
            errors: {},
        });
    }
    const content = yield (0, Template_Service_1.getAllTemplateContentService)();
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.SUCCESS,
        data: content,
    });
});
exports.getAllTemplateContentController = getAllTemplateContentController;
const updateTemplateContentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId, title, subTitle = null, description } = req.body;
    const content = yield (0, Template_Service_1.getContentByContentIDService)(contentId);
    if (content.length == 0) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.CONFLICT,
            message: ResponseMessage_1.default.TEMPLATE_CONTENT_NOT_FOUND,
            errors: {},
        });
    }
    const updatedContent = yield (0, Template_Service_1.updateTemplateContentService)(contentId, title, description, subTitle);
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.UPDATED_SUCCESSFULLY,
        data: updatedContent,
    });
});
exports.updateTemplateContentController = updateTemplateContentController;
const deleteTemplateContentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.params;
    const content = yield (0, Template_Service_1.getContentByContentIDService)(new mongoose_1.Types.ObjectId(contentId));
    if (content.length == 0) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.CONFLICT,
            message: ResponseMessage_1.default.TEMPLATE_CONTENT_NOT_FOUND,
            errors: {},
        });
    }
    const deletedContent = yield (0, Template_Service_1.deleteTemplateContentService)(new mongoose_1.Types.ObjectId(contentId));
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.DELETED_SUCCESSFULLY,
        data: deletedContent,
    });
});
exports.deleteTemplateContentController = deleteTemplateContentController;
const restoreTemplateContentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.params;
    const content = yield (0, Template_Service_1.getContentByContentIDService)(new mongoose_1.Types.ObjectId(contentId));
    if (content.length == 0) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.CONFLICT,
            message: ResponseMessage_1.default.TEMPLATE_CONTENT_NOT_FOUND,
            errors: {},
        });
    }
    const restoredContent = yield (0, Template_Service_1.restoreTemplateContentService)(new mongoose_1.Types.ObjectId(contentId));
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.RESTORED_SUCCESSFULLY,
        data: restoredContent,
    });
});
exports.restoreTemplateContentController = restoreTemplateContentController;
