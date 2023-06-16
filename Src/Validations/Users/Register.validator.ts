import Joi from "joi";
import {
  expressNextFunction,
  expressRequest,
  expressResponse,
} from "../../Dependencies";
import { validatorErrorMessage } from "../Validations";
import ResponseMessage from "../../Constants/ResponseMessage";
import UniqueValues from "../../Constants/UniqueValues";

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
      sessionStartTime: Joi.string().required(),
      availableDays: Joi.array()
        .items(
          Joi.string().valid(
            UniqueValues.MONDAY,
            UniqueValues.TUESDAY,
            UniqueValues.WEDNESDAY,
            UniqueValues.THURSDAY,
            UniqueValues.FRIDAY,
            UniqueValues.SATURDAY,
            UniqueValues.SUNDAY,
            UniqueValues.SMALL_MONDAY,
            UniqueValues.SMALL_TUESDAY,
            UniqueValues.SMALL_WEDNESDAY,
            UniqueValues.SMALL_THURSDAY,
            UniqueValues.SMALL_FRIDAY,
            UniqueValues.SMALL_SATURDAY,
            UniqueValues.SMALL_SUNDAY
          )
        )
        .required(),
      sessionEndTime: Joi.string().required(),
      role: Joi.string()
        .required()
        .valid(
          UniqueValues.ADMIN,
          UniqueValues.SUPER_ADMIN,
          UniqueValues.CLIENT,
          UniqueValues.DIETITIAN
        ),
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
