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
exports.getSectionValueController = exports.getSectionsController = exports.getTemplateDataController = void 0;
const ResponseMessage_1 = __importDefault(require("../../Constants/ResponseMessage"));
const Response_helper_1 = require("../../Helper/Response.helper");
const TemplateContent_Service_1 = require("../../Service/Template/NewTemplate/TemplateContent.Service");
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
    console.log(">>>>>", req.params);
    const { sectionId } = req.params;
    let sections = [];
    sections = yield (0, TemplateContent_Service_1.getSectionOneDataService)(userId, sectionId);
    if (sections.length == 0) {
        console.log("sectionId", sectionId);
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
