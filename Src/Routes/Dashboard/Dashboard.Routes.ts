import { createDashboardPropertyController } from "../../Controller/Dashboard/Dashboard.controller";
import { expressRouter } from "../../Dependencies";
import { asyncMiddleware } from "../../Middleware/AsyncMiddleware";
import { checkDashboardPropertyValidation } from "../../Validations/Dashboard/Dashboard.Validators";

const router = expressRouter();

// * <--------------------- Create Dashboard Properties-------------------------------->
router.post(
  "/create/property",
  checkDashboardPropertyValidation,
  asyncMiddleware(createDashboardPropertyController)
);

export default router;
