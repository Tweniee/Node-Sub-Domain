import { NextFunction, Request, Response } from "express";

//* <----------------------------------------Async Errors Handler--------------------------------------------->
export const asyncMiddleware = (handler: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
};