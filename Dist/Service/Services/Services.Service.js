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
exports.getAllServicesService = exports.getServiceByServiceIdService = exports.serviceUpdateService = exports.getServiceByServiceName = exports.serviceCreateService = void 0;
const mongoose_1 = require("mongoose");
const Index_1 = require("../../Model/Index");
// * Create Service from super admin dashboard
const serviceCreateService = (name, description) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield (0, exports.getServiceByServiceName)(name);
    if (service.length > 0) {
        return false;
    }
    const createdService = yield Index_1.ServiceModel.create({
        name,
        description,
    });
    return createdService;
});
exports.serviceCreateService = serviceCreateService;
// * Get Service by Service Name
const getServiceByServiceName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("name,", name);
    const service = yield Index_1.ServiceModel.aggregate([
        {
            $match: {
                name: {
                    $regex: "^" + name,
                    $options: "i",
                },
            },
        },
        {
            $project: {
                _id: 1,
                name: 1,
                image: 1,
                description: 1,
            },
        },
    ]);
    return service;
});
exports.getServiceByServiceName = getServiceByServiceName;
// * Update Service By service ID
const serviceUpdateService = (name, description, serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield (0, exports.getServiceByServiceIdService)(serviceId);
    if (service.length == 0) {
        return false;
    }
    const updatedService = yield Index_1.ServiceModel.findOneAndUpdate({
        _id: { $eq: new mongoose_1.Types.ObjectId(serviceId) },
    }, { $set: { name, description } }, { new: true });
    return updatedService;
});
exports.serviceUpdateService = serviceUpdateService;
// * get Service by service ID
const getServiceByServiceIdService = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield Index_1.ServiceModel.aggregate([
        {
            $match: {
                _id: { $eq: new mongoose_1.Types.ObjectId(serviceId) },
            },
        },
        {
            $project: {
                _id: 1,
                name: 1,
                image: 1,
                description: 1,
            },
        },
    ]);
    return service;
});
exports.getServiceByServiceIdService = getServiceByServiceIdService;
// * get All services
const getAllServicesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield Index_1.ServiceModel.aggregate([
        {
            $project: {
                _id: 1,
                name: 1,
                image: 1,
                description: 1,
            },
        },
    ]);
    return service;
});
exports.getAllServicesService = getAllServicesService;
