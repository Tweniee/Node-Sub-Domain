"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUsernameService = exports.registerService = void 0;
const passwordMiddleware_1 = require("../../Middleware/Password/passwordMiddleware");
const Index_1 = require("../../Model/Index");
const Role_service_1 = require("../Roles/Role.service");
const registerService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    //* Extract user data from request body
    const { firstName, lastName, email, username, role, password, dateOfBirth, phoneNumber, availableDays, sessionEndTime, sessionStartTime, } = req.body;
    const roleId = yield (0, Role_service_1.searchRoleByRoleName)(role);
    const user = yield Index_1.UserModel.create({
        firstName,
        lastName,
        username,
        email,
        role: roleId[0]._id,
        password: yield (0, passwordMiddleware_1.hashPassword)(password),
        dateOfBirth,
        availableDays,
        sessionEndTime,
        sessionStartTime,
        phoneNumber,
    });
    return user;
});
exports.registerService = registerService;
const checkUsernameService = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Index_1.UserModel.aggregate([
        {
            $match: { username: { $regex: `^${username}$`, $options: "i" } },
        },
    ]);
    return user;
});
exports.checkUsernameService = checkUsernameService;
