import Joi from "joi";
import {
  expressNextFunction,
  expressRequest,
  expressResponse,
} from "../../Dependencies";
import { validatorErrorMessage } from "../Validations";
import ResponseMessage from "../../Constants/ResponseMessage";

//* <---------------------------------------Register Validation------------------------------------------------->

export function registerValidation(
  req: expressRequest,
  res: expressResponse,
  next: expressNextFunction
): expressResponse<any, Record<string, any>> | undefined {
  try {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      role: Joi.string().hex().length(24).required(),
      password: Joi.string().required().regex(passwordRegex).messages({
        "string.pattern.base": ResponseMessage.INVALID_PASSWORD,
      }),
      dateOfBirth: Joi.date().required(),
      username: Joi.string().required(),
      phoneNumber: Joi.string().required(),
    });

    const isValid: any = schema.validate(req.body);
    if (isValid.error) {
      return validatorErrorMessage(isValid, res);
    }
    next();
  } catch (error) {
    next(error);
  }
}
