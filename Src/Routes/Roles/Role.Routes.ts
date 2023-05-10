import {
  createRoleController,
  deleteRoleController,
  getAllRoleController,
  getRoleByIdController,
  updateRoleController,
} from "../../Controller/Roles/Role.Controller";
import { expressRouter } from "../../Dependencies";
import { asyncMiddleware } from "../../Middleware/AsyncMiddleware";
import {} from "../../Middleware/Auth/authMiddleware";
import { authorize } from "../../Middleware/RBAC/RBAC.Middleware";
import {
  checkCreateRoleValidation,
  checkUpdateRoleValidation,
} from "../../Validations/Roles/Role.Validator";
import uniqueValue from "../../Constants/UniqueValues";

const router = expressRouter();

//* <--------------------Create Role Route --------------------------->
router.post(
  "/create",
  [checkCreateRoleValidation, authorize([uniqueValue.SUPER_ADMIN])],
  asyncMiddleware(createRoleController)
);

// * <-------------------Update Role Route---------------------------->
router.patch(
  "/update",
  [checkUpdateRoleValidation, authorize([uniqueValue.SUPER_ADMIN])],
  asyncMiddleware(updateRoleController)
);

// * <-------------------Delete Role Route---------------------------->
router.delete("/delete", asyncMiddleware(deleteRoleController));

// * <-------------------Get All Role Route--------------------------->
router.get("/getAll", asyncMiddleware(getAllRoleController));

// * <-------------------Get Single Role Route------------------------>
router.get("/getByRoleId", asyncMiddleware(getRoleByIdController));

export default router;
