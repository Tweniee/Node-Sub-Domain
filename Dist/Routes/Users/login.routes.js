"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Login_controller_1 = require("../../Controller/Users/Login.controller");
const AsyncMiddleware_1 = require("../../Middleware/AsyncMiddleware");
const router = (0, express_1.Router)();
//* <------------------------------------for Login User------------------------------------------------->
router.post("/", (0, AsyncMiddleware_1.asyncMiddleware)(Login_controller_1.loginController));
exports.default = router;
