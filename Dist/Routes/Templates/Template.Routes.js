"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Template_Controller_1 = require("../../Controller/Template/Template.Controller");
const Dependencies_1 = require("../../Dependencies");
const AsyncMiddleware_1 = require("../../Middleware/AsyncMiddleware");
const Template_Validators_1 = require("../../Validations/Template/Template.Validators");
const router = (0, Dependencies_1.expressRouter)();
// * <----------------------Template Content Create Route------------------------------>
router.post("/create", Template_Validators_1.checkCreateTemplateContentValidation, (0, AsyncMiddleware_1.asyncMiddleware)(Template_Controller_1.createTemplateContentController));
exports.default = router;
