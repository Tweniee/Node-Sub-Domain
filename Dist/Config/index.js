"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_PASS = exports.AUTH_EMAIL = exports.MAIN_PORT = exports.JWT_KEY = exports.DB_URI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
const DB_URI = process.env.MONGODB_URI;
exports.DB_URI = DB_URI;
const JWT_KEY = process.env.JWT_KEY;
exports.JWT_KEY = JWT_KEY;
const MAIN_PORT = process.env.MAIN_PORT;
exports.MAIN_PORT = MAIN_PORT;
const AUTH_EMAIL = process.env.AUTH_EMAIL;
exports.AUTH_EMAIL = AUTH_EMAIL;
const AUTH_PASS = process.env.AUTH_PASS;
exports.AUTH_PASS = AUTH_PASS;
