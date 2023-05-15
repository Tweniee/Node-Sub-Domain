import {
  createTemplateContentController,
  deleteTemplateContentController,
  getAllTemplateContentController,
  restoreTemplateContentController,
  updateTemplateContentController,
} from "../../Controller/Template/Template.Controller";
import { expressRouter } from "../../Dependencies";
import { asyncMiddleware } from "../../Middleware/AsyncMiddleware";
import { checkTabNameValidation } from "../../Validations/Permissions/Permissions.Validators";
import {
  checkCreateTemplateContentValidation,
  checkUpdateTemplateContentValidation,
} from "../../Validations/Template/Template.Validators";

const router = expressRouter();

// * <----------------------Template Content Create Route------------------------------>
router.post(
  "/create",
  checkCreateTemplateContentValidation,
  asyncMiddleware(createTemplateContentController)
);

// * <---------------------Get all Template Content Route------------------------------>
router.get(
  "/getAll",
  checkTabNameValidation,
  asyncMiddleware(getAllTemplateContentController)
);

// * <---------------------Update Template Content Route------------------------------->
router.patch(
  "/update",
  checkUpdateTemplateContentValidation,
  asyncMiddleware(updateTemplateContentController)
);

// * <--------------------Delete Template Content Route-------------------------------->
router.delete(
  "/delete/:contentId",
  checkTabNameValidation,
  asyncMiddleware(deleteTemplateContentController)
);

// * <--------------------Restore Template Content Route-------------------------------->
router.put(
  "/restore/:contentId",
  checkTabNameValidation,
  asyncMiddleware(restoreTemplateContentController)
);

export default router;
