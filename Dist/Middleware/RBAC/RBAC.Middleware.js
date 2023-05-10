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
exports.authorize = void 0;
const Role_service_1 = require("../../Service/Roles/Role.service");
function isAuthorized(userRole, allowedRoles) {
    return allowedRoles.includes(userRole);
}
function authorize(allowedRoles) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const { roleId } = req;
        if (roleId) {
            const userRole = yield (0, Role_service_1.getRoleByRoleId)(roleId);
            console.log(userRole);
            if (isAuthorized(userRole[0].name, allowedRoles)) {
                next(); // The user is authorized, continue with the next middleware function
            }
        }
        else {
            res.status(403).send("Forbidden"); // The user is not authorized, send a 403 Forbidden response
        }
    });
}
exports.authorize = authorize;
