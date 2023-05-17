import { emailTriggerHelper } from "../../../Helper/Email/Email.Helper";
import { EnquiryReply } from "../../../Interface/EnquiryReply.interface";
import { ReplyModel } from "../../../Model/Index";
import {
  updateEnquiryStatusService,
  getEmailOfEnquiryService,
} from "../Enquiry.Service";

export const answerEnquiryService = async (body: EnquiryReply) => {
  const { enquiryId, userId, message } = body;
  await updateEnquiryStatusService(enquiryId);
  const reply = await ReplyModel.create({ enquiryId, userId, message });
  const { userEmail } = await getEmailOfEnquiryService(enquiryId);
  emailTriggerHelper(userEmail);
  return reply;
};
