import Joi from "joi";
import {
  expressNextFunction,
  expressRequest,
  expressResponse,
} from "../../Dependencies";
import { validatorErrorMessage } from "../Validations";

//* <---------------------------------------Check Role Create------------------------------------------------->

export function checkCreateRoleValidation(
  req: expressRequest,
  res: expressResponse,
  next: expressNextFunction
): expressResponse<any, Record<string, any>> | undefined {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
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

//* <---------------------------------------Check Role Update------------------------------------------------->

export function checkUpdateRoleValidation(
  req: expressRequest,
  res: expressResponse,
  next: expressNextFunction
): expressResponse<any, Record<string, any>> | undefined {
  try {
    const schema = Joi.object({
      roleId: Joi.string().hex().length(24).required(),
      name: Joi.string().required(),
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
