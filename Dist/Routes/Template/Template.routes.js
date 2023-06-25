"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UniqueValues_1 = __importDefault(require("../../Constants/UniqueValues"));
const Template_Controller_1 = require("../../Controller/Template/Template.Controller");
const Dependencies_1 = require("../../Dependencies");
const AsyncMiddleware_1 = require("../../Middleware/AsyncMiddleware");
const RBAC_Middleware_1 = require("../../Middleware/RBAC/RBAC.Middleware");
const router = (0, Dependencies_1.expressRouter)();
// * <---------------------------------Get Template Content by UserId------------------------------------>
router.get("/getDataById/:userId", (0, RBAC_Middleware_1.authorize)([UniqueValues_1.default.DIETITIAN, UniqueValues_1.default.SUPER_ADMIN]), (0, AsyncMiddleware_1.asyncMiddleware)(Template_Controller_1.getTemplateDataController));
// *<----------------------------------Get All Sections--------------------------------------------------->
router.get("/getAllSections", (0, RBAC_Middleware_1.authorize)([UniqueValues_1.default.DIETITIAN, UniqueValues_1.default.SUPER_ADMIN]), (0, AsyncMiddleware_1.asyncMiddleware)(Template_Controller_1.getSectionsController));
// *<---------------------------Get Data on base of section Id-------------------------------------------->
router.get("/getSectionData/:sectionId", (0, RBAC_Middleware_1.authorize)([UniqueValues_1.default.DIETITIAN, UniqueValues_1.default.SUPER_ADMIN]), (0, AsyncMiddleware_1.asyncMiddleware)(Template_Controller_1.getSectionValueController));
// *<--------------------------------Update Banner Route--------------------------------------------------->
router.patch("/updateBannerSection", (0, RBAC_Middleware_1.authorize)([UniqueValues_1.default.DIETITIAN, UniqueValues_1.default.SUPER_ADMIN]), (0, AsyncMiddleware_1.asyncMiddleware)(Template_Controller_1.updateBannerSectionController));
// *<--------------------------------Update Cards Route--------------------------------------------------->
router.patch("/updateCardsSection", (0, RBAC_Middleware_1.authorize)([UniqueValues_1.default.DIETITIAN, UniqueValues_1.default.SUPER_ADMIN]), (0, AsyncMiddleware_1.asyncMiddleware)(Template_Controller_1.updateCardsSectionController));
// *<--------------------------------Update Exp Route--------------------------------------------------->
router.patch("/updateExpSection", (0, RBAC_Middleware_1.authorize)([UniqueValues_1.default.DIETITIAN, UniqueValues_1.default.SUPER_ADMIN]), (0, AsyncMiddleware_1.asyncMiddleware)(Template_Controller_1.updateExpSectionController));
// *<--------------------------------Update Growth Route--------------------------------------------------->
router.patch("/updateGrowthSection", (0, RBAC_Middleware_1.authorize)([UniqueValues_1.default.DIETITIAN, UniqueValues_1.default.SUPER_ADMIN]), (0, AsyncMiddleware_1.asyncMiddleware)(Template_Controller_1.updateGrowthSectionController));
// *<--------------------------------Update About Route--------------------------------------------------->
router.patch("/updateAboutSection", (0, RBAC_Middleware_1.authorize)([UniqueValues_1.default.DIETITIAN, UniqueValues_1.default.SUPER_ADMIN]), (0, AsyncMiddleware_1.asyncMiddleware)(Template_Controller_1.updateAboutSectionController));
exports.default = router;
