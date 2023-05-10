"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Users_controller_1 = require("../../Controller/Users/Users.controller");
const Dependencies_1 = require("../../Dependencies");
const AsyncMiddleware_1 = require("../../Middleware/AsyncMiddleware");
const router = (0, Dependencies_1.expressRouter)();
// * <---------------------Get All Registered Users--------------------------->
router.get("/getAll", (0, AsyncMiddleware_1.asyncMiddleware)(Users_controller_1.getAllUsersController));
// * <---------------------Get Single Registered Users--------------------------->
router.get("/getAll/:userId", (0, AsyncMiddleware_1.asyncMiddleware)(Users_controller_1.getUserByUserIdController));
exports.default = router;
