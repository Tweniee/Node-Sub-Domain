import Joi from "joi";
import {
  expressNextFunction,
  expressRequest,
  expressResponse,
} from "../../Dependencies";
import { validatorErrorMessage } from "../Validations";

//* <---------------------------------------Check Template Content Create------------------------------------------------->

export function checkCreateTemplateContentValidation(
  req: expressRequest,
  res: expressResponse,
  next: expressNextFunction
): expressResponse<any, Record<string, any>> | undefined {
  try {
    const schema = Joi.object({
      tabName: Joi.string().hex().length(24).required(),
      parentTab: Joi.string().hex().length(24).allow(null).optional(),
      title: Joi.string().required(),
      subTitle: Joi.string().optional(),
      image: Joi.string().optional().allow(null),
      description: Joi.string().required()
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

//* <---------------------------------------Check Template Content Update------------------------------------------------->

export function checkUpdateTemplateContentValidation(
  req: expressRequest,
  res: expressResponse,
  next: expressNextFunction
): expressResponse<any, Record<string, any>> | undefined {
  try {
    const schema = Joi.object({
      tabName: Joi.string().hex().length(24).required(),
      contentId: Joi.string().hex().length(24).required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      subTitle: Joi.string().optional(),
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
