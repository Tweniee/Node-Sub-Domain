"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Login_controller_1 = require("../../Controller/Users/Login.controller");
const router = (0, express_1.Router)();
// <------------------------------------for Login User------------------------------------------------->
router.post("/", Login_controller_1.loginUserController);
exports.default = router;
