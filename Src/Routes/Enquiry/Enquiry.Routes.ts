import { createEnquiryController, getAllEnquiryController } from "../../Controller/Enquiry/Enquiry.Controller";
import { expressRouter } from "../../Dependencies";
import { asyncMiddleware } from "../../Middleware/AsyncMiddleware";
import { checkCreateEnquiryValidation } from "../../Validations/Enquiry/Enquiry.Validator";

const router = expressRouter();

// *<-------------------------Create Enquiry---------------------------------->
router.post(
  "/create",
  checkCreateEnquiryValidation,
  asyncMiddleware(createEnquiryController)
);

// *<-------------------------Get All Enquiry--------------------------------->
router.get("/getAll",asyncMiddleware(getAllEnquiryController))

export default router;
