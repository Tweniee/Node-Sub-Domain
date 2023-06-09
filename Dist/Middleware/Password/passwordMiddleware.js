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
exports.comparePassword = exports.hashPassword = void 0;
const argon2_1 = __importDefault(require("argon2"));
//* Hashes a plaintext password and returns the resulting hash
function hashPassword(plaintext) {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = yield argon2_1.default.hash(plaintext);
        return hash;
    });
}
exports.hashPassword = hashPassword;
//* Compares a plaintext password to a hash and returns true if they match
function comparePassword(plaintext, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        const match = yield argon2_1.default.verify(hash, plaintext);
        return match;
    });
}
exports.comparePassword = comparePassword;
