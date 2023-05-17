import ResponseMessage from "../../Constants/ResponseMessage";
import { expressRequest, expressResponse } from "../../Dependencies";
import { successResponse } from "../../Helper/Response.helper";
import {
  createEnquiryService,
  getAllEnquiryService,
} from "../../Service/Enquiry/Enquiry.Service";

export const createEnquiryController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { userEmail, phoneNumber, goal, message } = req.body;
  const enquiry = await createEnquiryService({
    userEmail,
    phoneNumber,
    goal,
    message,
  });
  return successResponse(res, {
    message: ResponseMessage.ENQUIRY_CREATED_SUCCESSFULLY,
    data: enquiry,
  });
};

export const getAllEnquiryController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const enquiry = await getAllEnquiryService();
  return successResponse(res, {
    message: ResponseMessage.SUCCESS,
    data: enquiry,
  });
};
