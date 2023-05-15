import Joi from "joi";
import {
  expressNextFunction,
  expressRequest,
  expressResponse,
} from "../../Dependencies";
import { validatorErrorMessage } from "../Validations";
import ResponseMessage from "../../Constants/ResponseMessage";
import UniqueValues from "../../Constants/UniqueValues";

//* <---------------------------------------Dietitian Service Validation------------------------------------------------->

export function checkDietitianServiceValidation(
  req: expressRequest,
  res: expressResponse,
  next: expressNextFunction
): expressResponse<any, Record<string, any>> | undefined {
  try {
    const schema = Joi.object({
      tabName: Joi.string().hex().length(24).required(),
      serviceName: Joi.string().hex().length(24).required(),
      description: Joi.string().required(),
      price: Joi.number().positive().required(),
      durationInMinutes: Joi.number().positive().required(),
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

//* <---------------------------------------Update Dietitian Service Validation------------------------------------------------->

export function checkUpdateDietitianServiceValidation(
  req: expressRequest,
  res: expressResponse,
  next: expressNextFunction
): expressResponse<any, Record<string, any>> | undefined {
  try {
    const schema = Joi.object({
      tabName: Joi.string().hex().length(24).required(),
      serviceId: Joi.string().hex().length(24).required(),
      description: Joi.string().required(),
      price: Joi.number().positive().required(),
      durationInMinutes: Joi.number().positive().required(),
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
