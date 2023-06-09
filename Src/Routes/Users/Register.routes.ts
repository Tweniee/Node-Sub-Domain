import { expressRouter } from "../../Dependencies";
import { asyncMiddleware } from "../../Middleware/AsyncMiddleware";
import {
  RegisterController,
  checkUsernameController,
} from "../../Controller/Users/Register.controller";
import { registerValidation } from "../../Validations/Users/Register.validator";
import { checkUsernameValidation } from "../../Validations/Users/CheckUsername.validator";
import { apiLimiterMiddleware } from "../../Middleware/RequestLimiter";

const router = expressRouter();

//* <------------------------------------for Login User------------------------------------------------->
router.post(
  "/",
  apiLimiterMiddleware,
  registerValidation,
  asyncMiddleware(RegisterController)
);

//* <------------------------------------Check Username Regex-------------------------------------------->
router.post(
  "/check/username",
  checkUsernameValidation,
  asyncMiddleware(checkUsernameController)
);
export default router;
