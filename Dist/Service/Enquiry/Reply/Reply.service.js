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
Object.defineProperty(exports, "__esModule", { value: true });
exports.answerEnquiryService = void 0;
const Email_Helper_1 = require("../../../Helper/Email/Email.Helper");
const Index_1 = require("../../../Model/Index");
const Enquiry_Service_1 = require("../Enquiry.Service");
const answerEnquiryService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { enquiryId, userId, message } = body;
    yield (0, Enquiry_Service_1.updateEnquiryStatusService)(enquiryId);
    const reply = yield Index_1.ReplyModel.create({ enquiryId, userId, message });
    const { userEmail } = yield (0, Enquiry_Service_1.getEmailOfEnquiryService)(enquiryId);
    (0, Email_Helper_1.emailTriggerHelper)(userEmail);
    return reply;
});
exports.answerEnquiryService = answerEnquiryService;
