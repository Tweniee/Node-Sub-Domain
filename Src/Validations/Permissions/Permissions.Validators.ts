import Joi from "joi";
import {
  expressNextFunction,
  expressRequest,
  expressResponse,
} from "../../Dependencies";
import { validatorQueryErrorMessage } from "../Validations";
//* <---------------------------------------Check Tab Name------------------------------------------------->

export function checkTabNameValidation(
  req: expressRequest,
  res: expressResponse,
  next: expressNextFunction
): expressResponse<any, Record<string, any>> | undefined {
  try {
    const schema = Joi.object({
      tabName: Joi.string().hex().length(24).required(),
    });
    const isValid: any = schema.validate(req.query);
    if (isValid.error) {
      return validatorQueryErrorMessage(isValid, res);
    }
    next();
  } catch (error) {
    next(error);
  }
}
