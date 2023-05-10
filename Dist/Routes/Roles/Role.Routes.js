"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Role_Controller_1 = require("../../Controller/Roles/Role.Controller");
const Dependencies_1 = require("../../Dependencies");
const AsyncMiddleware_1 = require("../../Middleware/AsyncMiddleware");
const RBAC_Middleware_1 = require("../../Middleware/RBAC/RBAC.Middleware");
const Role_Validator_1 = require("../../Validations/Roles/Role.Validator");
const UniqueValues_1 = __importDefault(require("../../Constants/UniqueValues"));
const router = (0, Dependencies_1.expressRouter)();
//* <--------------------Create Role Route --------------------------->
router.post("/create", [Role_Validator_1.checkCreateRoleValidation, (0, RBAC_Middleware_1.authorize)([UniqueValues_1.default.SUPER_ADMIN])], (0, AsyncMiddleware_1.asyncMiddleware)(Role_Controller_1.createRoleController));
// * <-------------------Update Role Route---------------------------->
router.patch("/update", [Role_Validator_1.checkUpdateRoleValidation, (0, RBAC_Middleware_1.authorize)([UniqueValues_1.default.SUPER_ADMIN])], (0, AsyncMiddleware_1.asyncMiddleware)(Role_Controller_1.updateRoleController));
// * <-------------------Delete Role Route---------------------------->
router.delete("/delete", (0, AsyncMiddleware_1.asyncMiddleware)(Role_Controller_1.deleteRoleController));
// * <-------------------Get All Role Route--------------------------->
router.get("/getAll", (0, AsyncMiddleware_1.asyncMiddleware)(Role_Controller_1.getAllRoleController));
// * <-------------------Get Single Role Route------------------------>
router.get("/getByRoleId", (0, AsyncMiddleware_1.asyncMiddleware)(Role_Controller_1.getRoleByIdController));
exports.default = router;
