"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UniqueValues_1 = __importDefault(require("../../Constants/UniqueValues"));
const Subscription_Controller_1 = require("../../Controller/Subscription/Subscription.Controller");
const Dependencies_1 = require("../../Dependencies");
const AsyncMiddleware_1 = require("../../Middleware/AsyncMiddleware");
const RBAC_Middleware_1 = require("../../Middleware/RBAC/RBAC.Middleware");
const Permissions_Validators_1 = require("../../Validations/Permissions/Permissions.Validators");
const Subscription_Validator_1 = require("../../Validations/Subscription/Subscription.Validator");
const router = (0, Dependencies_1.expressRouter)();
// * <--------------------------Create Subscription Plan--------------------------->
router.post("/create", [
    Subscription_Validator_1.checkCreateSubscriptionPlanValidation,
    (0, RBAC_Middleware_1.authorize)([UniqueValues_1.default.ADMIN, UniqueValues_1.default.SUPER_ADMIN]),
], (0, AsyncMiddleware_1.asyncMiddleware)(Subscription_Controller_1.createSubscriptionPlanController));
// * <--------------------Get Single Subscription Plan----------------------------->
router.get("/getById/:planId", [Permissions_Validators_1.checkTabNameValidation, Subscription_Validator_1.checkPlanIdSubscriptionPlanValidation], (0, AsyncMiddleware_1.asyncMiddleware)(Subscription_Controller_1.getSubscriptionPlanByIdController));
// *<----------------------Get All Subscription Plan------------------------------->
router.get("/getAll", Permissions_Validators_1.checkTabNameValidation, (0, AsyncMiddleware_1.asyncMiddleware)(Subscription_Controller_1.getAllSubscriptionPlanController));
// *<-----------------------Update Subscription Plan------------------------------->
router.patch("/update", [
    Subscription_Validator_1.checkUpdateSubscriptionPlanValidation,
    (0, RBAC_Middleware_1.authorize)([UniqueValues_1.default.ADMIN, UniqueValues_1.default.SUPER_ADMIN]),
], (0, AsyncMiddleware_1.asyncMiddleware)(Subscription_Controller_1.updateSubscriptionPlanController));
// *<------------------------Delete Subscription Plan------------------------------>
router.delete("/delete/:planId", [
    Subscription_Validator_1.checkPlanIdSubscriptionPlanValidation,
    Permissions_Validators_1.checkTabNameValidation,
    (0, RBAC_Middleware_1.authorize)([UniqueValues_1.default.ADMIN, UniqueValues_1.default.SUPER_ADMIN]),
], (0, AsyncMiddleware_1.asyncMiddleware)(Subscription_Controller_1.deleteSubscriptionPlanController));
exports.default = router;
