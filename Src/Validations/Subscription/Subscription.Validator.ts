import Joi from "joi";
import {
  expressNextFunction,
  expressRequest,
  expressResponse,
} from "../../Dependencies";
import { validatorErrorMessage } from "../Validations";
import UniqueValues from "../../Constants/UniqueValues";

//* <---------------------------------------Check Subscription Plan Create------------------------------------------------->

export function checkCreateSubscriptionPlanValidation(
  req: expressRequest,
  res: expressResponse,
  next: expressNextFunction
): expressResponse<any, Record<string, any>> | undefined {
  try {
    const schema = Joi.object({
      tabName: Joi.string().hex().length(24).required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      currency: Joi.string().required(),
      price: Joi.number().required(),
      duration: Joi.string()
        .valid(
          UniqueValues.ONE_MONTH,
          UniqueValues.THREE_MONTHS,
          UniqueValues.SIX_MONTHS,
          UniqueValues.ONE_YEAR
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

//* <---------------------------------------Check Subscription Plan Update------------------------------------------------->

export function checkUpdateSubscriptionPlanValidation(
  req: expressRequest,
  res: expressResponse,
  next: expressNextFunction
): expressResponse<any, Record<string, any>> | undefined {
  try {
    const schema = Joi.object({
      planId: Joi.string().hex().length(24).required(),
      tabName: Joi.string().hex().length(24).required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      currency: Joi.string().required(),
      price: Joi.number().required(),
      duration: Joi.string()
        .valid(
          UniqueValues.ONE_MONTH,
          UniqueValues.THREE_MONTHS,
          UniqueValues.SIX_MONTHS,
          UniqueValues.ONE_YEAR
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

//* <---------------------------------------Check Subscription Plan Plan Id------------------------------------------------->

export function checkPlanIdSubscriptionPlanValidation(
  req: expressRequest,
  res: expressResponse,
  next: expressNextFunction
): expressResponse<any, Record<string, any>> | undefined {
  try {
    const schema = Joi.object({
      planId: Joi.string().hex().length(24).required()
    });

    const isValid: any = schema.validate(req.params);
    if (isValid.error) {
      return validatorErrorMessage(isValid, res);
    }
    next();
  } catch (error) {
    next(error);
  }
}
