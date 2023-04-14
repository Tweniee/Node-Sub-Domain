import rateLimit from "express-rate-limit";

export const apiLimiterMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, //* 15 minutes
  max: 5, //* Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message:
    "Too many accounts created from this IP, please try again after 15 min",
  standardHeaders: true, //* Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, //* Disable the `X-RateLimit-*` headers
});
