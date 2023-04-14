import StatusCodes from "../Constants/StatusCodes";
import { expressResponse } from "../Dependencies/index";

//* <--------------------------------SuccessResponse is used to send all successful response to client------------------------>
export const successResponse = (
  res: expressResponse,
  { message, data = {} }: any
) => {
  return res.status(StatusCodes.SUCCESS).json({
    success: true,
    message,
    body: data,
  });
};

//* <---------------------------------ErrorResponse is used to send all failure response to client---------------------------->
export const errorResponse = (
  res: expressResponse,
  { statusCode, message, errors }: any
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};
