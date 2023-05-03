import { Application, json } from "express";
import { RegisterRoute, loginRoute, RoleRoute } from "../Routes/Index";
import { apiLimiterMiddleware } from "../Middleware/RequestLimiter";
import { apiLoggerMiddleware } from "../Middleware/API_Logger/API_logger.middleware";

export const mainLayout = (app: Application) => {
  //* Middleware for parsing JSON in the request body
  app.use(json());
  //*limit the requests per IP (100/15min);
  app.use(apiLimiterMiddleware);
  app.use(apiLoggerMiddleware)

  app.use("/userLogin", loginRoute);
  app.use("/userRegister", RegisterRoute);
  app.use("/role", RoleRoute);
};
