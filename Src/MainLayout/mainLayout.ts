import { Application, json } from "express";
import {
  RegisterRoute,
  loginRoute,
  RoleRoute,
  ServiceRoute,
  UserRoute,
  DashBoardRoute,
  PermissionRoute,
  TemplateRoute,
  DietitianServiceRoute,
  ClientRoute,
  SubscriptionPlanRoute,
} from "../Routes/Index";
import { apiLimiterMiddleware } from "../Middleware/RequestLimiter";
import { apiLoggerMiddleware } from "../Middleware/API_Logger/API_logger.middleware";
import { jwtAuthMiddleware } from "../Middleware/Auth/authMiddleware";
import { invalidRouteHandlerMiddleware } from "../Middleware/invalidRoute/RouteGuard";

export const mainLayout = (app: Application) => {
  //* Middleware for parsing JSON in the request body
  app.use(json());
  //*limit the requests per IP (100/15min);
  app.use(apiLimiterMiddleware);
  app.use(apiLoggerMiddleware);

  app.use("/userLogin", loginRoute);
  app.use("/userRegister", RegisterRoute);
  app.use("/role", jwtAuthMiddleware, RoleRoute);
  app.use("/service", jwtAuthMiddleware, ServiceRoute);
  app.use("/users", jwtAuthMiddleware, UserRoute);
  app.use("/dashboard", jwtAuthMiddleware, DashBoardRoute);
  app.use("/permission", jwtAuthMiddleware, PermissionRoute);
  app.use("/templateContent", jwtAuthMiddleware, TemplateRoute);
  app.use("/dietitianService", jwtAuthMiddleware, DietitianServiceRoute);
  app.use("/clientEnquiry", jwtAuthMiddleware, ClientRoute);
  app.use("/subscriptionPlan", jwtAuthMiddleware, SubscriptionPlanRoute);
  // Handle invalid route on server
  app.use("*", invalidRouteHandlerMiddleware);
};
