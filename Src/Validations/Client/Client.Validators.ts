import Joi from "joi";
import {
  expressNextFunction,
  expressRequest,
  expressResponse,
} from "../../Dependencies";
import { validatorErrorMessage } from "../Validations";

//* <---------------------------------------Check Client Service Create------------------------------------------------->

export function checkClientServiceValidation(
  req: expressRequest,
  res: expressResponse,
  next: expressNextFunction
): expressResponse<any, Record<string, any>> | undefined {
  try {
    const schema = Joi.object({
      dietitian: Joi.string().hex().length(24).required(),
      goal: Joi.string().hex().length(24).required(),
      name: Joi.string().required(),
      age: Joi.number().integer().required(),
      gender: Joi.string().required(),
      activityLevel: Joi.string().required(),
      height: Joi.number().required(),
      weight: Joi.number().required(),
      medicalConditions: Joi.array().items(Joi.string()).optional(),
      allergies: Joi.array().items(Joi.string()).optional(),
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
