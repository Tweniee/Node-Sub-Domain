"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Permission_Controller_1 = require("../../../Controller/Dashboard/Permissions/Permission.Controller");
const Dependencies_1 = require("../../../Dependencies");
const AsyncMiddleware_1 = require("../../../Middleware/AsyncMiddleware");
const Permission_Validators_1 = require("../../../Validations/Dashboard/Permissions/Permission.Validators");
const router = (0, Dependencies_1.expressRouter)();
// *<------------------------Update Permission-------------------------->
router.patch("/update", Permission_Validators_1.checkUpdatePermissionValidation, (0, AsyncMiddleware_1.asyncMiddleware)(Permission_Controller_1.updatePermissionController));
exports.default = router;
