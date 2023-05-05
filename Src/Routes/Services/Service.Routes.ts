import {
  createServiceController,
  getAllServiceController,
  getServiceByIdController,
  searchServiceController,
  updateServiceController,
} from "../../Controller/Services/Service.Controller";
import { expressRouter } from "../../Dependencies";
import { asyncMiddleware } from "../../Middleware/AsyncMiddleware";
import { checkCreateRoleValidation } from "../../Validations/Roles/Role.Validator";
import {
  checkCreateServiceValidation,
  checkUpdateServiceValidation,
} from "../../Validations/Services/Service.validators";

const router = expressRouter();

// * <----------------------Create Service----------------------->
router.post(
  "/create",
  checkCreateServiceValidation,
  asyncMiddleware(createServiceController)
);

// * <----------------------Update Service----------------------->
router.patch(
  "/update",
  checkUpdateServiceValidation,
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
