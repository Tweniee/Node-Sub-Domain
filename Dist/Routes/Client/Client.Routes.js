"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UniqueValues_1 = __importDefault(require("../../Constants/UniqueValues"));
const Client_Controller_1 = require("../../Controller/Client/Client.Controller");
const Dependencies_1 = require("../../Dependencies");
const AsyncMiddleware_1 = require("../../Middleware/AsyncMiddleware");
const RBAC_Middleware_1 = require("../../Middleware/RBAC/RBAC.Middleware");
const Client_Validators_1 = require("../../Validations/Client/Client.Validators");
const router = (0, Dependencies_1.expressRouter)();
//  *<---------------------------Client Request Service Route-------------------------------->
router.post("/requestService", [Client_Validators_1.checkClientServiceValidation, (0, RBAC_Middleware_1.authorize)([UniqueValues_1.default.CLIENT])], (0, AsyncMiddleware_1.asyncMiddleware)(Client_Controller_1.clientRequestServiceController));
// *<----------------------------Delete Client Service Route--------------------------------->
router.delete("/deleteService/:serviceId", (0, RBAC_Middleware_1.authorize)([UniqueValues_1.default.CLIENT]), (0, AsyncMiddleware_1.asyncMiddleware)(Client_Controller_1.clientServiceDeleteController));
// *<----------------------------Get All Requested Service----------------------------------->
//  for Client
router.get("/getAll/clientData", (0, RBAC_Middleware_1.authorize)([UniqueValues_1.default.CLIENT]), (0, AsyncMiddleware_1.asyncMiddleware)(Client_Controller_1.getAllRequestedServiceController));
// *<----------------------------Get All Requested Service----------------------------------->
//  for Dietitian
router.get("/getAll/dietitianData", (0, RBAC_Middleware_1.authorize)([UniqueValues_1.default.DIETITIAN]), (0, AsyncMiddleware_1.asyncMiddleware)(Client_Controller_1.getAllReceivedServiceController));
// *<---------------------------Get Single Requested Service--------------------------------->
router.get("/getSingle/:serviceId", (0, RBAC_Middleware_1.authorize)([UniqueValues_1.default.CLIENT, UniqueValues_1.default.DIETITIAN]), (0, AsyncMiddleware_1.asyncMiddleware)(Client_Controller_1.getSingleRequestedServiceController));
exports.default = router;
