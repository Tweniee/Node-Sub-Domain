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
exports.updatePermissionService = void 0;
const mongoose_1 = require("mongoose");
const Index_1 = require("../../../Model/Index");
const updatePermissionService = (permissionId, canCreate, canRead, canUpdate, canDelete) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedPermission = yield Index_1.PermissionModel.findOneAndUpdate({
        _id: new mongoose_1.Types.ObjectId(permissionId),
    }, { $set: { canCreate, canRead, canUpdate, canDelete } }, { new: true });
    return updatedPermission;
});
exports.updatePermissionService = updatePermissionService;
