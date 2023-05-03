import {
  expressNextFunction,
  expressRequest,
  expressResponse,
} from "../../Dependencies";

export const apiLoggerMiddleware = (
  req: expressRequest,
  res: expressResponse,
  next: expressNextFunction
) => {

  console.log("-------------")
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.originalUrl}`);
  console.log("|\n|")
//   console.log(`Request Body: ${JSON.stringify(req.body)}`);
//   console.log(`Request Headers: ${JSON.stringify(req.headers)}`);

  // Log response details after sending the response
  res.on("finish", () => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log("-------------")
    // console.log(`Response Headers: ${JSON.stringify(res.getHeaders())}`);
    // console.log(`Response Body: ${JSON.stringify(res.body)}`);
  });

  next();
};
