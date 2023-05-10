import { updatePermissionController } from "../../../Controller/Dashboard/Permissions/Permission.Controller";
import { expressRouter } from "../../../Dependencies";
import { asyncMiddleware } from "../../../Middleware/AsyncMiddleware";
import { checkUpdatePermissionValidation } from "../../../Validations/Dashboard/Permissions/Permission.Validators";

const router = expressRouter();

// *<------------------------Update Permission-------------------------->
router.patch(
  "/update",
  checkUpdatePermissionValidation,
  asyncMiddleware(updatePermissionController)
);

export default router;
  