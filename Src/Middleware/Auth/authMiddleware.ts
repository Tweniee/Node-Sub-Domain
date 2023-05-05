import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../../Helper/Response.helper";
import StatusCodes from "../../Constants/StatusCodes";
import ResponseMessage from "../../Constants/ResponseMessage";
import { JWT_KEY } from "../../Config";
import { Types } from "mongoose";

interface TokenPayload {
  userId: string;
  roleId: typeof Types.ObjectId;
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const createJWTMiddleware = (
  userId: string,
  roleId: typeof Types.ObjectId
): string => {
  const payload: TokenPayload = { userId, roleId };
  const secret = JWT_KEY;

  return jwt.sign(payload, secret);
};

export const jwtAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return errorResponse(res, {
      statusCode: StatusCodes.UNAUTHORIZED,
      message: ResponseMessage.NOT_TOKEN_PROVIDED,
      errors: {},
    });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return errorResponse(res, {
      statusCode: StatusCodes.UNAUTHORIZED,
      message: ResponseMessage.TOKEN_ERROR,
      errors: {},
    });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return errorResponse(res, {
      statusCode: StatusCodes.UNAUTHORIZED,
      message: ResponseMessage.TOKEN_MALFORMATTED,
      errors: {},
    });
  }

  jwt.verify(token, JWT_KEY, (err, decoded) => {
    if (err) {
      return errorResponse(res, {
        statusCode: StatusCodes.UNAUTHORIZED,
        message: ResponseMessage.INVALID_TOKEN,
        errors: {},
      });
    }

    const { userId } = decoded as TokenPayload;

    req.userId = userId;

    return next();
  });
};
