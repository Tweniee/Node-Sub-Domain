import {
  createDietitianServiceController,
  deleteDietitianServiceController,
  getAllDietitianServiceController,
  getSingleDietitianServiceController,
  updateDietitianServiceController,
} from "../../Controller/DietitianService/DietitianService.Controller";
import { expressRouter } from "../../Dependencies";
import { asyncMiddleware } from "../../Middleware/AsyncMiddleware";
import {
  checkDietitianServiceValidation,
  checkUpdateDietitianServiceValidation,
} from "../../Validations/DietitianService/DietitianService.validators";

const router = expressRouter();

// * <-------------------------Create Dietitian Service Route------------------------------------>
router.post(
  "/create",
  checkDietitianServiceValidation,
  asyncMiddleware(createDietitianServiceController)
);

//  * <------------------------Get Single Dietitian Service Route-------------------------------->
router.get(
  "/getSingle/:serviceId",
  asyncMiddleware(getSingleDietitianServiceController)
);

// *<--------------------------Update Dietitian Service Route------------------------------------>
router.patch(
  "/update",
  checkUpdateDietitianServiceValidation,
  asyncMiddleware(updateDietitianServiceController)
);

// *<----------------------------Delete Dietitian Service Route---------------------------------->
router.delete(
  "/delete/:serviceId",
  asyncMiddleware(deleteDietitianServiceController)
);

// *<--------------------------Get All Dietitian Services Route---------------------------------->
router.get("/getAll", asyncMiddleware(getAllDietitianServiceController));

export default router;
