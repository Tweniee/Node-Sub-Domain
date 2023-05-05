"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Role_Controller_1 = require("../../Controller/Roles/Role.Controller");
const Dependencies_1 = require("../../Dependencies");
const AsyncMiddleware_1 = require("../../Middleware/AsyncMiddleware");
const Role_Validator_1 = require("../../Validations/Roles/Role.Validator");
const router = (0, Dependencies_1.expressRouter)();
//* <--------------------Create Role Route --------------------------->
router.post("/create", [Role_Validator_1.checkCreateRoleValidation], (0, AsyncMiddleware_1.asyncMiddleware)(Role_Controller_1.createRoleController));
// * <-------------------Update Role Route---------------------------->
router.patch("/update", [Role_Validator_1.checkUpdateRoleValidation], (0, AsyncMiddleware_1.asyncMiddleware)(Role_Controller_1.updateRoleController));
// * <-------------------Delete Role Route---------------------------->
router.delete("/delete", (0, AsyncMiddleware_1.asyncMiddleware)(Role_Controller_1.deleteRoleController));
// * <-------------------Get All Role Route--------------------------->
router.get("/getAll", (0, AsyncMiddleware_1.asyncMiddleware)(Role_Controller_1.getAllRoleController));
// * <-------------------Get Single Role Route------------------------>
router.get("/getByRoleId", (0, AsyncMiddleware_1.asyncMiddleware)(Role_Controller_1.getRoleByIdController));
exports.default = router;
