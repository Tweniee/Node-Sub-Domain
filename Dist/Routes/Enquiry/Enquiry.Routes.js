"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enquiry_Controller_1 = require("../../Controller/Enquiry/Enquiry.Controller");
const Dependencies_1 = require("../../Dependencies");
const AsyncMiddleware_1 = require("../../Middleware/AsyncMiddleware");
const Enquiry_Validator_1 = require("../../Validations/Enquiry/Enquiry.Validator");
const router = (0, Dependencies_1.expressRouter)();
// *<-------------------------Create Enquiry---------------------------------->
router.post("/create", Enquiry_Validator_1.checkCreateEnquiryValidation, (0, AsyncMiddleware_1.asyncMiddleware)(Enquiry_Controller_1.createEnquiryController));
// *<-------------------------Get All Enquiry--------------------------------->
router.get("/getAll", (0, AsyncMiddleware_1.asyncMiddleware)(Enquiry_Controller_1.getAllEnquiryController));
exports.default = router;
