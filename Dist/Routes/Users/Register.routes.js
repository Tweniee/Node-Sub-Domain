"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dependencies_1 = require("../../Dependencies");
const AsyncMiddleware_1 = require("../../Middleware/AsyncMiddleware");
const Register_controller_1 = require("../../Controller/Users/Register.controller");
const Register_validator_1 = require("../../Validations/Users/Register.validator");
const CheckUsername_validator_1 = require("../../Validations/Users/CheckUsername.validator");
const router = (0, Dependencies_1.expressRouter)();
//* <------------------------------------for Login User------------------------------------------------->
router.post("/", Register_validator_1.registerValidation, (0, AsyncMiddleware_1.asyncMiddleware)(Register_controller_1.RegisterController));
//* <------------------------------------Check Username Regex-------------------------------------------->
router.post("/check/username", CheckUsername_validator_1.checkUsernameValidation, (0, AsyncMiddleware_1.asyncMiddleware)(Register_controller_1.checkUsernameController));
exports.default = router;
