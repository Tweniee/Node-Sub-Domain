"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UniqueValues_1 = __importDefault(require("../../Constants/UniqueValues"));
const Dashboard_Controller_1 = require("../../Controller/Dashboard/Dashboard.Controller");
const Dependencies_1 = require("../../Dependencies");
const AsyncMiddleware_1 = require("../../Middleware/AsyncMiddleware");
const RBAC_Middleware_1 = require("../../Middleware/RBAC/RBAC.Middleware");
const Dashboard_Validators_1 = require("../../Validations/Dashboard/Dashboard.Validators");
const router = (0, Dependencies_1.expressRouter)();
// * <--------------------- Create Dashboard Property---------------------------------->
router.post("/create/property", [Dashboard_Validators_1.checkDashboardPropertyValidation, (0, RBAC_Middleware_1.authorize)([UniqueValues_1.default.SUPER_ADMIN])], (0, AsyncMiddleware_1.asyncMiddleware)(Dashboard_Controller_1.createDashboardPropertyController));
// * <-----------------------Update Dashboard Property--------------------------------->
router.patch("/update/property", [
    Dashboard_Validators_1.checkUpdate_DashboardPropertyValidation,
    (0, RBAC_Middleware_1.authorize)([UniqueValues_1.default.SUPER_ADMIN]),
], (0, AsyncMiddleware_1.asyncMiddleware)(Dashboard_Controller_1.updateDashboardPropertyController));
// * <-----------------------Get Single DashBoard property----------------------------->
router.get("/get/property/:propertyId", (0, AsyncMiddleware_1.asyncMiddleware)(Dashboard_Controller_1.getSingleProperty_And_PermissionsService));
// *<-------------------------Get All Dashboard Properties----------------------------->
router.get("/getAll/properties", (0, AsyncMiddleware_1.asyncMiddleware)(Dashboard_Controller_1.getAllDashboardPropertyController));
exports.default = router;
