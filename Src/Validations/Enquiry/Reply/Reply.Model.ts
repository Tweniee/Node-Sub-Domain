import Joi from "joi";
import {
  expressNextFunction,
  expressRequest,
  expressResponse,
} from "../../../Dependencies";
import { validatorErrorMessage } from "../../Validations";

//* <---------------------------------------Check Enquiry Reply Create------------------------------------------------->

export function checkCreateEnquiryReplyValidation(
  req: expressRequest,
  res: expressResponse,
  next: expressNextFunction
): expressResponse<any, Record<string, any>> | undefined {
  try {
    const schema = Joi.object({
      enquiryId: Joi.string().hex().length(24).required(),
      userId: Joi.string().hex().length(24).required(),
      message: Joi.string().required(),
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
