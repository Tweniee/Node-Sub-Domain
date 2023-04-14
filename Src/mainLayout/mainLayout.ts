import { Application, json } from "express";
import { RegisterRoute, loginRoute } from "../Routes/Index";
import { apiLimiterMiddleware } from "../Middleware/RequestLimiter";

export const mainLayout = (app: Application) => {
  //* Middleware for parsing JSON in the request body
  app.use(json());
  //*limit the requests per IP (100/15min);
  app.use(apiLimiterMiddleware)

  app.use("/userLogin", loginRoute);
  app.use("/userRegister", RegisterRoute);
};
