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
exports.getSingleRequestedServiceController = exports.getAllReceivedServiceController = exports.getAllRequestedServiceController = exports.clientServiceDeleteController = exports.clientRequestServiceController = void 0;
const ResponseMessage_1 = __importDefault(require("../../Constants/ResponseMessage"));
const StatusCodes_1 = __importDefault(require("../../Constants/StatusCodes"));
const Response_helper_1 = require("../../Helper/Response.helper");
const Client_Service_1 = require("../../Service/Client/Client.Service");
const clientRequestServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dietitian, goal, name, age, gender, activityLevel, height, weight, medicalConditions = [], allergies = [], } = req.body;
    const client = req.userId;
    const clientEnquiry = yield (0, Client_Service_1.createClientEnquiryService)({
        client,
        dietitian,
        goal,
        name,
        age,
        gender,
        activityLevel,
        height,
        weight,
        medicalConditions,
        allergies,
    });
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.CLIENT_REQUEST_CREATED_SUCCESSFULLY,
        data: clientEnquiry,
    });
});
exports.clientRequestServiceController = clientRequestServiceController;
const clientServiceDeleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId } = req.params;
    const isValid = yield (0, Client_Service_1.checkToDeleteService)(serviceId);
    if (isValid.length == 0) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.FORBIDDEN,
            message: ResponseMessage_1.default.CANNOT_DELETE_NOW,
            errors: {},
        });
    }
    const deletedService = yield (0, Client_Service_1.clientServiceDeleteService)(serviceId);
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.SERVICE_DELETED,
        data: deletedService,
    });
});
exports.clientServiceDeleteController = clientServiceDeleteController;
const getAllRequestedServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const getAllRequestedService = yield (0, Client_Service_1.getAllRequestedService_Service)(userId);
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.SUCCESS,
        data: getAllRequestedService,
    });
});
exports.getAllRequestedServiceController = getAllRequestedServiceController;
const getAllReceivedServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const getAllRequestedService = yield (0, Client_Service_1.getAllRequestedService_Service)(userId);
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.SUCCESS,
        data: getAllRequestedService,
    });
});
exports.getAllReceivedServiceController = getAllReceivedServiceController;
const getSingleRequestedServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId } = req.params;
    const service = yield (0, Client_Service_1.getSingleService_Service)(serviceId);
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.SUCCESS,
        data: service,
    });
});
exports.getSingleRequestedServiceController = getSingleRequestedServiceController;
