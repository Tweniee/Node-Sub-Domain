import { createTemplateContentController } from "../../Controller/Template/Template.Controller";
import { expressRouter } from "../../Dependencies";
import { asyncMiddleware } from "../../Middleware/AsyncMiddleware";
import { checkCreateTemplateContentValidation } from "../../Validations/Template/Template.Validators";

const router = expressRouter();

// * <----------------------Template Content Create Route------------------------------>
router.post(
  "/create",
  checkCreateTemplateContentValidation,
  asyncMiddleware(createTemplateContentController)
);

export default router;
