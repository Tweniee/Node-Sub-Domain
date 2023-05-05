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
exports.searchServiceController = exports.getServiceByIdController = exports.getAllServiceController = exports.updateServiceController = exports.createServiceController = void 0;
const ResponseMessage_1 = __importDefault(require("../../Constants/ResponseMessage"));
const StatusCodes_1 = __importDefault(require("../../Constants/StatusCodes"));
const Response_helper_1 = require("../../Helper/Response.helper");
const Services_Service_1 = require("../../Service/Services/Services.Service");
// * A Super Admin will create service that out portal will provide
// * Dietitian then can select these service and provide services
const createServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    const service = yield (0, Services_Service_1.serviceCreateService)(name, description);
    if (!service) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.CONFLICT,
            message: ResponseMessage_1.default.SERVICE_ALREADY_EXISTS,
            errors: {},
        });
    }
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.SERVICE_CREATED_SUCCESSFULLY,
        data: service,
    });
});
exports.createServiceController = createServiceController;
// * A Super Admin will update a service that out portal is providing
// * Dietitian then can select these service and provide services
const updateServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, serviceId } = req.body;
    const service = yield (0, Services_Service_1.serviceUpdateService)(name, description, serviceId);
    if (!service) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.CONFLICT,
            message: ResponseMessage_1.default.SERVICE_NOT_FOUND,
            errors: {},
        });
    }
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.SERVICE_UPDATED_SUCCESSFULLY,
        data: service,
    });
});
exports.updateServiceController = updateServiceController;
// * All users will be able to get all services that our portal offers
const getAllServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield (0, Services_Service_1.getAllServicesService)();
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.SUCCESS,
        data: service,
    });
});
exports.getAllServiceController = getAllServiceController;
// * All users will be able to get Single service by there ID
const getServiceByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId } = req.params;
    const service = yield (0, Services_Service_1.getServiceByServiceIdService)(serviceId);
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.SUCCESS,
        data: service,
    });
});
exports.getServiceByIdController = getServiceByIdController;
// * Search Service that are available
const searchServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const service = yield (0, Services_Service_1.getServiceByServiceName)(name);
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.SEARCHED_RESULT,
        data: service,
    });
});
exports.searchServiceController = searchServiceController;
