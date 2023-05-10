import UniqueValues from "../../Constants/UniqueValues";
import {
  createDashboardPropertyController,
  getAllDashboardPropertyController,
  getSingleProperty_And_PermissionsService,
  updateDashboardPropertyController,
} from "../../Controller/Dashboard/Dashboard.Controller";
import { expressRouter } from "../../Dependencies";
import { asyncMiddleware } from "../../Middleware/AsyncMiddleware";
import { authorize } from "../../Middleware/RBAC/RBAC.Middleware";
import {
  checkDashboardPropertyValidation,
  checkUpdate_DashboardPropertyValidation,
} from "../../Validations/Dashboard/Dashboard.Validators";

const router = expressRouter();

// * <--------------------- Create Dashboard Property---------------------------------->
router.post(
  "/create/property",
  [checkDashboardPropertyValidation, authorize([UniqueValues.SUPER_ADMIN])],
  asyncMiddleware(createDashboardPropertyController)
);

// * <-----------------------Update Dashboard Property--------------------------------->
router.patch(
  "/update/property",
  [
    checkUpdate_DashboardPropertyValidation,
    authorize([UniqueValues.SUPER_ADMIN]),
  ],
  asyncMiddleware(updateDashboardPropertyController)
);

// * <-----------------------Get Single DashBoard property----------------------------->
router.get(
  "/get/property/:propertyId",
  asyncMiddleware(getSingleProperty_And_PermissionsService)
);

// *<-------------------------Get All Dashboard Properties----------------------------->
router.get(
  "/getAll/properties",
  asyncMiddleware(getAllDashboardPropertyController)
);
export default router;
