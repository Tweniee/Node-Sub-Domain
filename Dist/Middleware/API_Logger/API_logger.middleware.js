"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLoggerMiddleware = void 0;
const apiLoggerMiddleware = (req, res, next) => {
    console.log("-------------");
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.originalUrl}`);
    console.log("|\n|");
    //   console.log(`Request Body: ${JSON.stringify(req.body)}`);
    //   console.log(`Request Headers: ${JSON.stringify(req.headers)}`);
    // Log response details after sending the response
    res.on("finish", () => {
        console.log(`Status Code: ${res.statusCode}`);
        console.log("-------------");
        // console.log(`Response Headers: ${JSON.stringify(res.getHeaders())}`);
        // console.log(`Response Body: ${JSON.stringify(res.body)}`);
    });
    next();
};
exports.apiLoggerMiddleware = apiLoggerMiddleware;
