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
exports.isUserNumberAlreadyExistService = exports.isUserEmailAlreadyExistService = void 0;
const Index_1 = require("../../Model/Index");
const isUserEmailAlreadyExistService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Index_1.UserModel.aggregate([
        {
            $match: {
                email: { $eq: email },
            },
        },
    ]);
    return user;
});
exports.isUserEmailAlreadyExistService = isUserEmailAlreadyExistService;
const isUserNumberAlreadyExistService = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Index_1.UserModel.aggregate([
        {
            $match: {
                phoneNumber: { $eq: phoneNumber },
            },
        },
    ]);
    return user;
});
exports.isUserNumberAlreadyExistService = isUserNumberAlreadyExistService;
