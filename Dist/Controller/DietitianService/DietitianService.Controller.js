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
exports.getAllDietitianServiceController = exports.deleteDietitianServiceController = exports.updateDietitianServiceController = exports.getSingleDietitianServiceController = exports.createDietitianServiceController = void 0;
const mongoose_1 = require("mongoose");
const ResponseMessage_1 = __importDefault(require("../../Constants/ResponseMessage"));
const Response_helper_1 = require("../../Helper/Response.helper");
const DieitianService_Service_1 = require("../../Service/DietitianService/DieitianService.Service");
const StatusCodes_1 = __importDefault(require("../../Constants/StatusCodes"));
const createDietitianServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tabName, serviceName, description, price, durationInMinutes, availableDays, } = req.body;
    const dietitian = new mongoose_1.Types.ObjectId(req.userId);
    const dietitianService = yield (0, DieitianService_Service_1.createDietitianService_Service)({
        serviceName,
        description,
        dietitian,
        tabName,
        price,
        durationInMinutes,
        availableDays,
    });
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.DIETITIAN_SERVICE_CREATED,
        data: dietitianService,
    });
});
exports.createDietitianServiceController = createDietitianServiceController;
const getSingleDietitianServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId = null } = req.params;
    if (!serviceId) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.BAD_REQUEST,
            message: ResponseMessage_1.default.INVALID_PARAMS,
            errors: {},
        });
    }
    const dietitianService = yield (0, DieitianService_Service_1.getSingleDietitianServiceMainService)(new mongoose_1.Types.ObjectId(serviceId));
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.DIETITIAN_DATA,
        data: dietitianService,
    });
});
exports.getSingleDietitianServiceController = getSingleDietitianServiceController;
const updateDietitianServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId = null, description, price, durationInMinutes, availableDays, } = req.body;
    if (!serviceId) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.BAD_REQUEST,
            message: ResponseMessage_1.default.INVALID_PARAMS,
            errors: {},
        });
    }
    const dietitian = req.userId;
    const dietitianService = yield (0, DieitianService_Service_1.updateDietitianService_Service)({
        serviceId,
        description,
        price,
        durationInMinutes,
        availableDays,
    }, dietitian);
    if (!dietitianService) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.NOT_FOUND,
            message: ResponseMessage_1.default.INVALID_SERVICE_ID,
            errors: {},
        });
    }
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.DIETITIAN_SERVICE_UPDATED_SUCCESSFULLY,
        data: dietitianService,
    });
});
exports.updateDietitianServiceController = updateDietitianServiceController;
const deleteDietitianServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId = null } = req.params;
    if (!serviceId) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.BAD_REQUEST,
            message: ResponseMessage_1.default.INVALID_PARAMS,
            errors: {},
        });
    }
    const dietitian = req.userId;
    const dietitianService = yield (0, DieitianService_Service_1.deleteDietitianService_Service)(new mongoose_1.Types.ObjectId(serviceId), dietitian);
    if (!dietitianService) {
        return (0, Response_helper_1.errorResponse)(res, {
            statusCode: StatusCodes_1.default.NOT_FOUND,
            message: ResponseMessage_1.default.INVALID_SERVICE_ID,
            errors: {},
        });
    }
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.DIETITIAN_SERVICE_DELETED,
        data: dietitianService,
    });
});
exports.deleteDietitianServiceController = deleteDietitianServiceController;
const getAllDietitianServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dietitian = req.userId;
    const dietitianService = yield (0, DieitianService_Service_1.getAllDietitianService_Service)(dietitian);
    return (0, Response_helper_1.successResponse)(res, {
        message: ResponseMessage_1.default.SUCCESS,
        data: dietitianService,
    });
});
exports.getAllDietitianServiceController = getAllDietitianServiceController;
