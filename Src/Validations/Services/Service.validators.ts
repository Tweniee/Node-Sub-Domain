import Joi from "joi";
import {
  expressNextFunction,
  expressRequest,
  expressResponse,
} from "../../Dependencies";
import { validatorErrorMessage } from "../Validations";

//* <---------------------------------------Check Service Create------------------------------------------------->

export function checkCreateServiceValidation(
  req: expressRequest,
  res: expressResponse,
  next: expressNextFunction
): expressResponse<any, Record<string, any>> | undefined {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      image: Joi.string().optional(),
      description: Joi.string().required(),
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

//* <---------------------------------------Check Service Update------------------------------------------------->

export function checkUpdateServiceValidation(
  req: expressRequest,
  res: expressResponse,
  next: expressNextFunction
): expressResponse<any, Record<string, any>> | undefined {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      image: Joi.string().optional(),
      description: Joi.string().required(),
      serviceId: Joi.string().hex().length(24).required(),
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

//* <---------------------------------------Check Service Create------------------------------------------------->

export function checkFileUploadValidation(
  req: expressRequest,
  res: expressResponse,
  next: expressNextFunction
): expressResponse<any, Record<string, any>> | undefined {
  try {
    console.log(req.files);
    const schema = Joi.object({
      image: Joi.object({
        name: Joi.string().required(),
        mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
        size: Joi.number().required(), // Maximum size of 5MB
        data: Joi.binary().required(),
        encoding: Joi.string().required(),
        tempFilePath: Joi.string().allow(""),
        truncated: Joi.boolean().required(),
        md5: Joi.string().required(),
        mv: Joi.function().required(),
      }).required(),
    });

    const isValid: any = schema.validate(req.files);
    if (isValid.error) {
      return validatorErrorMessage(isValid, res);
    }
    next();
  } catch (error) {
    next(error);
  }
}
