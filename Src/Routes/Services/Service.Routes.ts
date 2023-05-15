import {
  createServiceController,
  getAllServiceController,
  getServiceByIdController,
  searchServiceController,
  updateServiceController,
} from "../../Controller/Services/Service.Controller";
import { expressRouter } from "../../Dependencies";
import { asyncMiddleware } from "../../Middleware/AsyncMiddleware";
import { authorize } from "../../Middleware/RBAC/RBAC.Middleware";
import { checkCreateRoleValidation } from "../../Validations/Roles/Role.Validator";
import {
  checkCreateServiceValidation,
  checkUpdateServiceValidation,
} from "../../Validations/Services/Service.validators";
import uniqueValue from "../../Constants/UniqueValues";

const router = expressRouter();
// * <----------------------Create Service----------------------->
router.post(
  "/create",
  [checkCreateServiceValidation, authorize([uniqueValue.SUPER_ADMIN])],
  asyncMiddleware(createServiceController)
);

// * <----------------------Update Service----------------------->
router.patch(
  "/update",
  [checkUpdateServiceValidation, authorize([uniqueValue.SUPER_ADMIN])],
  asyncMiddleware(updateServiceController)
);

// * <------------------Get All Services List-------------------->
router.get("/getAll", asyncMiddleware(getAllServiceController));

// * <---------------------Get Service by Id--------------------->
router.get("/getById/:serviceId", asyncMiddleware(getServiceByIdController));

// * <------------------Search Service by Name------------------->
router.post(
  "/search",
  checkCreateRoleValidation,
  asyncMiddleware(searchServiceController)
);
export default router;
