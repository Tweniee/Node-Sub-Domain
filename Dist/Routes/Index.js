"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoute = exports.RoleRoute = exports.loginRoute = exports.RegisterRoute = void 0;
const login_routes_1 = __importDefault(require("./Users/login.routes"));
exports.loginRoute = login_routes_1.default;
const Register_routes_1 = __importDefault(require("./Users/Register.routes"));
exports.RegisterRoute = Register_routes_1.default;
const Role_Routes_1 = __importDefault(require("./Roles/Role.Routes"));
exports.RoleRoute = Role_Routes_1.default;
const Service_Routes_1 = __importDefault(require("./Services/Service.Routes"));
exports.ServiceRoute = Service_Routes_1.default;
