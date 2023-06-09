import { Application, json } from "express";
import {
  RegisterRoute,
  loginRoute,
  RoleRoute,
  ServiceRoute,
  UserRoute,
  DashBoardRoute,
  PermissionRoute,
  DietitianServiceRoute,
  EnquiryRoute,
  ClientRoute,
  SubscriptionPlanRoute,
  ReplyRoute,
  TemplateRoute,
} from "../Routes/Index";
import cors from "cors";
import { apiLimiterMiddleware } from "../Middleware/RequestLimiter";
import { apiLoggerMiddleware } from "../Middleware/API_Logger/API_logger.middleware";
import { jwtAuthMiddleware } from "../Middleware/Auth/authMiddleware";
import { invalidRouteHandlerMiddleware } from "../Middleware/invalidRoute/RouteGuard";

export const mainLayout = (app: Application) => {
  //* Middleware for parsing JSON in the request body
  app.use(json());
  // * Cross Origin
  app.use(cors());

  app.use("/userRegister", RegisterRoute);
  //*limit the requests per IP (1000/15min);
  app.use(apiLimiterMiddleware);
  app.use(apiLoggerMiddleware);

  
  app.use("/userLogin", loginRoute);
  app.use("/role", jwtAuthMiddleware, RoleRoute);
  app.use("/service", jwtAuthMiddleware, ServiceRoute);
  app.use("/users", jwtAuthMiddleware, UserRoute);
  app.use("/dashboard", jwtAuthMiddleware, DashBoardRoute);
  app.use("/permission", jwtAuthMiddleware, PermissionRoute);
  app.use("/templateContent", jwtAuthMiddleware, TemplateRoute); // * new approach
  app.use("/dietitianService", jwtAuthMiddleware, DietitianServiceRoute);
  app.use("/clientEnquiry", jwtAuthMiddleware, ClientRoute);
  app.use("/subscriptionPlan", jwtAuthMiddleware, SubscriptionPlanRoute);
  app.use("/Enquiry", jwtAuthMiddleware, EnquiryRoute);
  app.use("/EnquiryReply", jwtAuthMiddleware, ReplyRoute);
  // Handle invalid route on server
  app.use("*", invalidRouteHandlerMiddleware);
};
