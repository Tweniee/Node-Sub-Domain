"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Reply_Controller_1 = require("../../../Controller/Enquiry/Reply/Reply.Controller");
const Dependencies_1 = require("../../../Dependencies");
const AsyncMiddleware_1 = require("../../../Middleware/AsyncMiddleware");
const Reply_Model_1 = require("../../../Validations/Enquiry/Reply/Reply.Model");
const router = (0, Dependencies_1.expressRouter)();
// *<---------------------------Reply to a Enquiry------------------------->
router.post("/", Reply_Model_1.checkCreateEnquiryReplyValidation, (0, AsyncMiddleware_1.asyncMiddleware)(Reply_Controller_1.replyEnquiryController));
exports.default = router;
