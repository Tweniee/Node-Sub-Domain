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
      numberOfSessionPerWeek: Joi.number().positive().required(),
      totalWeekForSession: Joi.number().positive().required(),
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
      numberOfSessionPerWeek: Joi.number().positive().required(),
      totalWeekForSession: Joi.number().positive().required(),
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
