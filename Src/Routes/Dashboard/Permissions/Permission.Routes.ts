import UniqueValues from "../../../Constants/UniqueValues";
import { updatePermissionController } from "../../../Controller/Dashboard/Permissions/Permission.Controller";
import { expressRouter } from "../../../Dependencies";
import { asyncMiddleware } from "../../../Middleware/AsyncMiddleware";
import { authorize } from "../../../Middleware/RBAC/RBAC.Middleware";
import { checkUpdatePermissionValidation } from "../../../Validations/Dashboard/Permissions/Permission.Validators";

const router = expressRouter();

// *<------------------------Update Permission-------------------------->
router.patch(
  "/update",
  [checkUpdatePermissionValidation, authorize([UniqueValues.SUPER_ADMIN])],
  asyncMiddleware(updatePermissionController)
);

export default router;
