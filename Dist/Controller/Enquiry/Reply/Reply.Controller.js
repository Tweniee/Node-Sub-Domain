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
exports.replyEnquiryController = void 0;
const ResponseMessage_1 = __importDefault(require("../../../Constants/ResponseMessage"));
const Response_helper_1 = require("../../../Helper/Response.helper");
const Reply_service_1 = require("../../../Service/Enquiry/Reply/Reply.service");
const replyEnquiryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { enquiryId, userId, message } = req.body;
    const enquiryReply = yield (0, Reply_service_1.answerEnquiryService)({
        enquiryId,
        userId,
        message,
    });
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.ENQUIRY_REPLY_SUCCESSFULLY,
        data: enquiryReply,
    });
});
exports.replyEnquiryController = replyEnquiryController;
