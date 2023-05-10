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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDashboard_Property_Permission_Service = exports.createDashboardPropertyService = void 0;
const Index_1 = require("../../Model/Index");
const Dashboard_Model_1 = __importDefault(require("../../Model/Dashboard/Dashboard.Model"));
const createDashboardPropertyService = (name, role) => __awaiter(void 0, void 0, void 0, function* () {
    // *Create a Default Permission and get its _id
    const { _id: permissionId } = yield (0, exports.createDashboard_Property_Permission_Service)();
    // * create dashboard property
    const property = yield Dashboard_Model_1.default.create({ name, role, permissionId });
    return property;
});
exports.createDashboardPropertyService = createDashboardPropertyService;
const createDashboard_Property_Permission_Service = () => __awaiter(void 0, void 0, void 0, function* () {
    const permission = yield Index_1.PermissionModel.create({});
    return permission;
});
exports.createDashboard_Property_Permission_Service = createDashboard_Property_Permission_Service;
