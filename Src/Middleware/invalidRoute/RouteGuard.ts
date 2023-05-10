
import { NextFunction, Request, Response } from "express";
import StatusCodes from "../../Constants/StatusCodes";
import { errorResponse } from "../../Helper/Response.helper";
import ResponseMessage from "../../Constants/ResponseMessage";

// <------------------------------------------Invalid Routes Middleware-------------------------------->
export const invalidRouteHandlerMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return errorResponse(res, {
        statusCode: StatusCodes.NOT_FOUND,
        message: ResponseMessage.INVALID_ROUTE,
        errors: `Cannot find ${req.method} ${req.url}`,
      });
    } catch (error) {
      next(error);
    }
  };