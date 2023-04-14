"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainLayout = void 0;
const express_1 = require("express");
const Index_1 = require("../Routes/Index");
const RequestLimiter_1 = require("../Middleware/RequestLimiter");
const mainLayout = (app) => {
    //* Middleware for parsing JSON in the request body
    app.use((0, express_1.json)());
    //*limit the requests per IP (100/15min);
    app.use(RequestLimiter_1.apiLimiterMiddleware);
    app.use("/userLogin", Index_1.loginRoute);
    app.use("/userRegister", Index_1.RegisterRoute);
};
exports.mainLayout = mainLayout;
