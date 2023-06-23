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
exports.updateCardsSectionController = exports.updateBannerSectionController = exports.getSectionValueController = exports.getSectionsController = exports.getTemplateDataController = void 0;
const ResponseMessage_1 = __importDefault(require("../../Constants/ResponseMessage"));
const Response_helper_1 = require("../../Helper/Response.helper");
const path_1 = __importDefault(require("path"));
const fileUpload_helper_1 = require("../../Helper/fileUpload/fileUpload.helper");
const TemplateContent_Service_1 = require("../../Service/Template/NewTemplate/TemplateContent.Service");
const updateTemplateContent_Service_1 = require("../../Service/Template/NewTemplate/updateTemplateContent.Service");
const StatusCodes_1 = __importDefault(require("../../Constants/StatusCodes"));
const getTemplateDataController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const templateData = yield (0, TemplateContent_Service_1.getTemplateDataService)(userId);
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.SUCCESS,
        data: templateData[0],
    });
});
exports.getTemplateDataController = getTemplateDataController;
const getSectionsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const sections = yield (0, TemplateContent_Service_1.getSectionByUserIdService)(userId);
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.SUCCESS,
        data: sections,
    });
});
exports.getSectionsController = getSectionsController;
const getSectionValueController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { sectionId } = req.params;
    let sections = [];
    sections = yield (0, TemplateContent_Service_1.getSectionOneDataService)(userId, sectionId);
    if (sections.length == 0) {
        sections = yield (0, TemplateContent_Service_1.getSectionTwoDataService)(userId, sectionId);
    }
    if (sections.length == 0) {
        sections = yield (0, TemplateContent_Service_1.getSectionThreeDataService)(userId, sectionId);
    }
    if (sections.length == 0) {
        sections = yield (0, TemplateContent_Service_1.getSectionFourDataService)(userId, sectionId);
    }
    if (sections.length == 0) {
        sections = yield (0, TemplateContent_Service_1.getSectionFiveDataService)(userId, sectionId);
    }
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.SUCCESS,
        data: sections[0],
    });
});
exports.getSectionValueController = getSectionValueController;
const updateBannerSectionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, bg_Image, subHeading, text } = req.body;
    const banner = yield (0, updateTemplateContent_Service_1.getOldSectionOneService)(_id);
    yield (0, updateTemplateContent_Service_1.updateTextService)(banner.text._id, text);
    yield (0, updateTemplateContent_Service_1.updateTextService)(banner.text.subHeading._id, subHeading);
    let images = "";
    if (!req.files || Object.keys(req.files).length === 0) {
        images = bg_Image;
        const bannerImage = yield (0, updateTemplateContent_Service_1.updateBannerImageService)(_id, images);
        return (0, Response_helper_1.successResponse)(res, {
            message: ResponseMessage_1.default.SUCCESS,
            data: bannerImage,
        });
    }
    else {
        const file = req.files.bg_Image;
        file.mv(path_1.default.join(__dirname, "/../../uploads/", (0, fileUpload_helper_1.transformImageName)(file.name)), (error) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                console.error(error);
                console.log({ message: ResponseMessage_1.default.ERROR_FILE_UPLOAD });
                return (0, Response_helper_1.errorResponse)(res, {
                    statusCode: StatusCodes_1.default.BAD_REQUEST,
                    message: ResponseMessage_1.default.ERROR_FILE_UPLOAD,
                    errors: error,
                });
            }
            // File successfully uploaded
            console.log({ message: "File uploaded successfully" });
            images = (0, fileUpload_helper_1.transformImageName)(file.name);
            const bannerImage = yield (0, updateTemplateContent_Service_1.updateBannerImageService)(_id, images);
            return (0, Response_helper_1.successResponse)(res, {
                message: ResponseMessage_1.default.SERVICE_UPDATED_SUCCESSFULLY,
                data: bannerImage,
            });
        }));
    }
});
exports.updateBannerSectionController = updateBannerSectionController;
const updateCardsSectionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.updateCardsSectionController = updateCardsSectionController;
