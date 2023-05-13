"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Template_Controller_1 = require("../../Controller/Template/Template.Controller");
const Dependencies_1 = require("../../Dependencies");
const AsyncMiddleware_1 = require("../../Middleware/AsyncMiddleware");
const Template_Validators_1 = require("../../Validations/Template/Template.Validators");
const router = (0, Dependencies_1.expressRouter)();
// * <----------------------Template Content Create Route------------------------------>
router.post("/create", Template_Validators_1.checkCreateTemplateContentValidation, (0, AsyncMiddleware_1.asyncMiddleware)(Template_Controller_1.createTemplateContentController));
// * <---------------------Get all Template Content Route------------------------------>
router.get("/getAll", (0, AsyncMiddleware_1.asyncMiddleware)(Template_Controller_1.getAllTemplateContentController));
// * <---------------------Update Template Content Route------------------------------->
router.patch("/update", Template_Validators_1.checkUpdateTemplateContentValidation, (0, AsyncMiddleware_1.asyncMiddleware)(Template_Controller_1.updateTemplateContentController));
// * <--------------------Delete Template Content Route-------------------------------->
router.delete("/delete/:contentId", (0, AsyncMiddleware_1.asyncMiddleware)(Template_Controller_1.deleteTemplateContentController));
// * <--------------------Restore Template Content Route-------------------------------->
router.put("/restore/:contentId", (0, AsyncMiddleware_1.asyncMiddleware)(Template_Controller_1.restoreTemplateContentController));
exports.default = router;
