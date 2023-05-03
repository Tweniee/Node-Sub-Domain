import {
  createRoleController,
  deleteRoleController,
  getAllRoleController,
  getRoleByIdController,
  updateRoleController,
} from "../../Controller/Roles/Role.Controller";
import { expressRouter } from "../../Dependencies";
import { asyncMiddleware } from "../../Middleware/AsyncMiddleware";
import {
  checkCreateRoleValidation,
  checkUpdateRoleValidation,
} from "../../Validations/Roles/Role.Validator";

const router = expressRouter();

//* <--------------------Create Role Route --------------------------->
router.post(
  "/create",
  checkCreateRoleValidation,
  asyncMiddleware(createRoleController)
);

// * <-------------------Update Role Route---------------------------->
router.patch(
  "/update",
  checkUpdateRoleValidation,
  asyncMiddleware(updateRoleController)
);

// * <-------------------Delete Role Route---------------------------->
router.delete("/delete", asyncMiddleware(deleteRoleController));

// * <-------------------Get All Role Route--------------------------->
router.get("/getAll", asyncMiddleware(getAllRoleController));

// * <-------------------Get Single Role Route------------------------>
router.get("/getByRoleId", asyncMiddleware(getRoleByIdController));

export default router;
