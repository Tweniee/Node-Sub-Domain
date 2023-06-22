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
exports.getAllDashboardPropertyController = exports.getSingleProperty_And_PermissionsService = exports.updateDashboardPropertyController = exports.createDashboardPropertyController = void 0;
const mongoose_1 = require("mongoose");
const ResponseMessage_1 = __importDefault(require("../../Constants/ResponseMessage"));
const StatusCodes_1 = __importDefault(require("../../Constants/StatusCodes"));
const Response_helper_1 = require("../../Helper/Response.helper");
const Dashboard_Service_1 = require("../../Service/Dashboard/Dashboard.Service");
const createDashboardPropertyController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, role, route, image } = req.body;
    const dashboard = yield (0, Dashboard_Service_1.createDashboardPropertyService)(name, role, route, image);
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.DASHBOARD_PROPERTY_CREATED,
        data: dashboard,
    });
});
exports.createDashboardPropertyController = createDashboardPropertyController;
const updateDashboardPropertyController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, role, propertyId, image, route } = req.body;
    // * checks if the property is available or not
    const isValidProperty = yield (0, Dashboard_Service_1.getPropertyByPropertyIdService)(propertyId);
    if (isValidProperty.length == 0) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.NOT_FOUND,
            message: ResponseMessage_1.default.NO_PROPERTY_FOUND,
            errors: {},
        });
    }
    // * if property is available then update it and return
    const updatedProperty = yield (0, Dashboard_Service_1.updateDashBoardPropertyService)(name, role, propertyId, route, image);
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.PROPERTY_UPDATED,
        data: updatedProperty,
    });
});
exports.updateDashboardPropertyController = updateDashboardPropertyController;
const getSingleProperty_And_PermissionsService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { propertyId } = req.params;
    const property = yield (0, Dashboard_Service_1.getPropertyByPropertyIdService)(new mongoose_1.Types.ObjectId(propertyId));
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.SUCCESS,
        data: property,
    });
});
exports.getSingleProperty_And_PermissionsService = getSingleProperty_And_PermissionsService;
const getAllDashboardPropertyController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const properties = yield (0, Dashboard_Service_1.getAllDashboardPropertiesService)();
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.SUCCESS,
        data: properties,
    });
});
exports.getAllDashboardPropertyController = getAllDashboardPropertyController;
