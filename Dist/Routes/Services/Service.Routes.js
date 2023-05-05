"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Service_Controller_1 = require("../../Controller/Services/Service.Controller");
const Dependencies_1 = require("../../Dependencies");
const AsyncMiddleware_1 = require("../../Middleware/AsyncMiddleware");
const Role_Validator_1 = require("../../Validations/Roles/Role.Validator");
const Service_validators_1 = require("../../Validations/Services/Service.validators");
const router = (0, Dependencies_1.expressRouter)();
// * <----------------------Create Service----------------------->
router.post("/create", Service_validators_1.checkCreateServiceValidation, (0, AsyncMiddleware_1.asyncMiddleware)(Service_Controller_1.createServiceController));
// * <----------------------Update Service----------------------->
router.patch("/update", Service_validators_1.checkUpdateServiceValidation, (0, AsyncMiddleware_1.asyncMiddleware)(Service_Controller_1.updateServiceController));
// * <------------------Get All Services List-------------------->
router.get("/getAll", (0, AsyncMiddleware_1.asyncMiddleware)(Service_Controller_1.getAllServiceController));
// * <---------------------Get Service by Id--------------------->
router.get("/getById/:serviceId", (0, AsyncMiddleware_1.asyncMiddleware)(Service_Controller_1.getServiceByIdController));
// * <------------------Search Service by Name------------------->
router.post("/search", Role_Validator_1.checkCreateRoleValidation, (0, AsyncMiddleware_1.asyncMiddleware)(Service_Controller_1.searchServiceController));
exports.default = router;
