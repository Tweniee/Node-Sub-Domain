"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DietitianService_Controller_1 = require("../../Controller/DietitianService/DietitianService.Controller");
const Dependencies_1 = require("../../Dependencies");
const AsyncMiddleware_1 = require("../../Middleware/AsyncMiddleware");
const DietitianService_validators_1 = require("../../Validations/DietitianService/DietitianService.validators");
const router = (0, Dependencies_1.expressRouter)();
// * <-------------------------Create Dietitian Service Route------------------------------------>
router.post("/create", DietitianService_validators_1.checkDietitianServiceValidation, (0, AsyncMiddleware_1.asyncMiddleware)(DietitianService_Controller_1.createDietitianServiceController));
//  * <------------------------Get Single Dietitian Service Route-------------------------------->
router.get("/getSingle/:serviceId", (0, AsyncMiddleware_1.asyncMiddleware)(DietitianService_Controller_1.getSingleDietitianServiceController));
// *<--------------------------Update Dietitian Service Route------------------------------------>
router.patch("/update", DietitianService_validators_1.checkUpdateDietitianServiceValidation, (0, AsyncMiddleware_1.asyncMiddleware)(DietitianService_Controller_1.updateDietitianServiceController));
// *<----------------------------Delete Dietitian Service Route---------------------------------->
router.delete("/delete/:serviceId", (0, AsyncMiddleware_1.asyncMiddleware)(DietitianService_Controller_1.deleteDietitianServiceController));
// *<--------------------------Get All Dietitian Services Route---------------------------------->
router.get("/getAll", (0, AsyncMiddleware_1.asyncMiddleware)(DietitianService_Controller_1.getAllDietitianServiceController));
exports.default = router;
