"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainLayout = void 0;
const express_1 = require("express");
const Index_1 = require("../Routes/Index");
const RequestLimiter_1 = require("../Middleware/RequestLimiter");
const API_logger_middleware_1 = require("../Middleware/API_Logger/API_logger.middleware");
const authMiddleware_1 = require("../Middleware/Auth/authMiddleware");
const RouteGuard_1 = require("../Middleware/invalidRoute/RouteGuard");
const mainLayout = (app) => {
    //* Middleware for parsing JSON in the request body
    app.use((0, express_1.json)());
    //*limit the requests per IP (100/15min);
    app.use(RequestLimiter_1.apiLimiterMiddleware);
    app.use(API_logger_middleware_1.apiLoggerMiddleware);
    app.use("/userLogin", Index_1.loginRoute);
    app.use("/userRegister", Index_1.RegisterRoute);
    app.use("/role", authMiddleware_1.jwtAuthMiddleware, Index_1.RoleRoute);
    app.use("/service", authMiddleware_1.jwtAuthMiddleware, Index_1.ServiceRoute);
    app.use("/users", authMiddleware_1.jwtAuthMiddleware, Index_1.UserRoute);
    app.use("/dashboard", authMiddleware_1.jwtAuthMiddleware, Index_1.DashBoardRoute);
    app.use("/permission", authMiddleware_1.jwtAuthMiddleware, Index_1.PermissionRoute);
    app.use("/templateContent", authMiddleware_1.jwtAuthMiddleware, Index_1.TemplateRoute);
    app.use("/dietitianService", authMiddleware_1.jwtAuthMiddleware, Index_1.DietitianServiceRoute);
    app.use("/clientEnquiry", authMiddleware_1.jwtAuthMiddleware, Index_1.ClientRoute);
    app.use("/subscriptionPlan", authMiddleware_1.jwtAuthMiddleware, Index_1.SubscriptionPlanRoute);
    app.use("/Enquiry", authMiddleware_1.jwtAuthMiddleware, Index_1.EnquiryRoute);
    app.use("/EnquiryReply", authMiddleware_1.jwtAuthMiddleware, Index_1.ReplyRoute);
    // Handle invalid route on server
    app.use("*", RouteGuard_1.invalidRouteHandlerMiddleware);
};
exports.mainLayout = mainLayout;
