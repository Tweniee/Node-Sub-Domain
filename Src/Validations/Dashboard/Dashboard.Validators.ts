import Joi from "joi";
import {
  expressNextFunction,
  expressRequest,
  expressResponse,
} from "../../Dependencies";
import { validatorErrorMessage } from "../Validations";
import { Types } from "mongoose";

//* <---------------------------------------Check Dashboard Property Create------------------------------------------------->

export function checkDashboardPropertyValidation(
  req: expressRequest,
  res: expressResponse,
  next: expressNextFunction
): expressResponse<any, Record<string, any>> | undefined {
  try {
    // *valid(Types.ObjectId.toString()* //
    const schema = Joi.object({
      image: Joi.string().required(),
      role: Joi.array().items(Joi.string().hex().length(24)).required(),
      name: Joi.string().required(),
      route: Joi.string().required(),
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

//* <---------------------------------------Check Dashboard Property Update------------------------------------------------->

export function checkUpdate_DashboardPropertyValidation(
  req: expressRequest,
  res: expressResponse,
  next: expressNextFunction
): expressResponse<any, Record<string, any>> | undefined {
  try {
    // *valid(Types.ObjectId.toString()* //
    const schema = Joi.object({
      image: Joi.string().required(),
      propertyId: Joi.string().hex().length(24).required(),
      role: Joi.array().items(Joi.string().hex().length(24)).required(),
      name: Joi.string().required(),
      route: Joi.string().required(),
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
