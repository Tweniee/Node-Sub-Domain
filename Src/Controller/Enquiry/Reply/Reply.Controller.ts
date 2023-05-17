import ResponseMessage from "../../../Constants/ResponseMessage";
import { expressRequest, expressResponse } from "../../../Dependencies";
import { successResponse } from "../../../Helper/Response.helper";
import { answerEnquiryService } from "../../../Service/Enquiry/Reply/Reply.service";

export const replyEnquiryController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { enquiryId, userId, message } = req.body;
  const enquiryReply = await answerEnquiryService({
    enquiryId,
    userId,
    message,
  });
  return successResponse(res, {
    message: ResponseMessage.ENQUIRY_REPLY_SUCCESSFULLY,
    data: enquiryReply,
  });
};
