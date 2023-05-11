"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UniqueValues_1 = __importDefault(require("../../../Constants/UniqueValues"));
const Permission_Controller_1 = require("../../../Controller/Dashboard/Permissions/Permission.Controller");
const Dependencies_1 = require("../../../Dependencies");
const AsyncMiddleware_1 = require("../../../Middleware/AsyncMiddleware");
const RBAC_Middleware_1 = require("../../../Middleware/RBAC/RBAC.Middleware");
const Permission_Validators_1 = require("../../../Validations/Dashboard/Permissions/Permission.Validators");
const router = (0, Dependencies_1.expressRouter)();
// *<------------------------Update Permission-------------------------->
router.patch("/update", [Permission_Validators_1.checkUpdatePermissionValidation, (0, RBAC_Middleware_1.authorize)([UniqueValues_1.default.SUPER_ADMIN])], (0, AsyncMiddleware_1.asyncMiddleware)(Permission_Controller_1.updatePermissionController));
exports.default = router;
