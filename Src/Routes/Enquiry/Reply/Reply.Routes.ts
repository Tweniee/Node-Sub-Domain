import { replyEnquiryController } from "../../../Controller/Enquiry/Reply/Reply.Controller";
import { expressRouter } from "../../../Dependencies";
import { asyncMiddleware } from "../../../Middleware/AsyncMiddleware";
import { checkCreateEnquiryReplyValidation } from "../../../Validations/Enquiry/Reply/Reply.Model";

const router = expressRouter();

// *<---------------------------Reply to a Enquiry------------------------->
router.post(
  "/",
  checkCreateEnquiryReplyValidation,
  asyncMiddleware(replyEnquiryController)
);

export default router;
