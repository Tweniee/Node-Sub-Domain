import UniqueValues from "../../Constants/UniqueValues";
import {
  createSubscriptionPlanController,
  deleteSubscriptionPlanController,
  getAllSubscriptionPlanController,
  getSubscriptionPlanByIdController,
  updateSubscriptionPlanController,
} from "../../Controller/Subscription/Subscription.Controller";
import { expressRouter } from "../../Dependencies";
import { asyncMiddleware } from "../../Middleware/AsyncMiddleware";
import { authorize } from "../../Middleware/RBAC/RBAC.Middleware";
import { checkTabNameValidation } from "../../Validations/Permissions/Permissions.Validators";
import {
  checkCreateSubscriptionPlanValidation,
  checkPlanIdSubscriptionPlanValidation,
  checkUpdateSubscriptionPlanValidation,
} from "../../Validations/Subscription/Subscription.Validator";

const router = expressRouter();

// * <--------------------------Create Subscription Plan--------------------------->
router.post(
  "/create",
  [
    checkCreateSubscriptionPlanValidation,
    authorize([UniqueValues.ADMIN, UniqueValues.SUPER_ADMIN]),
  ],
  asyncMiddleware(createSubscriptionPlanController)
);

// * <--------------------Get Single Subscription Plan----------------------------->
router.get(
  "/getById/:planId",
  [checkTabNameValidation, checkPlanIdSubscriptionPlanValidation],
  asyncMiddleware(getSubscriptionPlanByIdController)
);

// *<----------------------Get All Subscription Plan------------------------------->
router.get(
  "/getAll",
  checkTabNameValidation,
  asyncMiddleware(getAllSubscriptionPlanController)
);

// *<-----------------------Update Subscription Plan------------------------------->
router.patch(
  "/update",
  [
    checkUpdateSubscriptionPlanValidation,
    authorize([UniqueValues.ADMIN, UniqueValues.SUPER_ADMIN]),
  ],
  asyncMiddleware(updateSubscriptionPlanController)
);

// *<------------------------Delete Subscription Plan------------------------------>
router.delete(
  "/delete/:planId",
  [
    checkPlanIdSubscriptionPlanValidation,
    checkTabNameValidation,
    authorize([UniqueValues.ADMIN, UniqueValues.SUPER_ADMIN]),
  ],
  asyncMiddleware(deleteSubscriptionPlanController)
);
export default router;
