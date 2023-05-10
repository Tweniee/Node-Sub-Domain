"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dashboard_controller_1 = require("../../Controller/Dashboard/Dashboard.controller");
const Dependencies_1 = require("../../Dependencies");
const AsyncMiddleware_1 = require("../../Middleware/AsyncMiddleware");
const Dashboard_Validators_1 = require("../../Validations/Dashboard/Dashboard.Validators");
const router = (0, Dependencies_1.expressRouter)();
// * <--------------------- Create Dashboard Properties-------------------------------->
router.post("/create/property", Dashboard_Validators_1.checkDashboardPropertyValidation, (0, AsyncMiddleware_1.asyncMiddleware)(Dashboard_controller_1.createDashboardPropertyController));
exports.default = router;
