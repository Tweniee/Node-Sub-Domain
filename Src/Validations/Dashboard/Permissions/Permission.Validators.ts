import Joi from "joi";
import {
  expressNextFunction,
  expressRequest,
  expressResponse,
} from "../../../Dependencies";
import { validatorErrorMessage } from "../../Validations";
import { Types } from "mongoose";

//* <---------------------------------------Check Permissions Update------------------------------------------------->

export function checkUpdatePermissionValidation(
  req: expressRequest,
  res: expressResponse,
  next: expressNextFunction
): expressResponse<any, Record<string, any>> | undefined {
  try {
    // *valid(Types.ObjectId.toString()* //
    const schema = Joi.object({
      permissionId: Joi.string().hex().length(24).required(),
      canCreate: Joi.boolean().required(),
      canRead: Joi.boolean().required(),
      canUpdate: Joi.boolean().required(),
      canDelete: Joi.boolean().required(),
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
