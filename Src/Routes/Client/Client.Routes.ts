import UniqueValues from "../../Constants/UniqueValues";
import {
  clientRequestServiceController,
  clientServiceDeleteController,
  getAllReceivedServiceController,
  getAllRequestedServiceController,
  getSingleRequestedServiceController,
} from "../../Controller/Client/Client.Controller";
import { expressRouter } from "../../Dependencies";
import { asyncMiddleware } from "../../Middleware/AsyncMiddleware";
import { authorize } from "../../Middleware/RBAC/RBAC.Middleware";
import { checkClientServiceValidation } from "../../Validations/Client/Client.Validators";

const router = expressRouter();

//  *<---------------------------Client Request Service Route-------------------------------->
router.post(
  "/requestService",
  [checkClientServiceValidation, authorize([UniqueValues.CLIENT])],
  asyncMiddleware(clientRequestServiceController)
);

// *<----------------------------Delete Client Service Route--------------------------------->
router.delete(
  "/deleteService/:serviceId",
  authorize([UniqueValues.CLIENT]),
  asyncMiddleware(clientServiceDeleteController)
);

// *<----------------------------Get All Requested Service----------------------------------->
//  for Client
router.get(
  "/getAll/clientData",
  authorize([UniqueValues.CLIENT]),
  asyncMiddleware(getAllRequestedServiceController)
);

// *<----------------------------Get All Requested Service----------------------------------->
//  for Dietitian
router.get(
  "/getAll/dietitianData",
  authorize([UniqueValues.DIETITIAN]),
  asyncMiddleware(getAllReceivedServiceController)
);

// *<---------------------------Get Single Requested Service--------------------------------->
router.get(
  "/getSingle/:serviceId",
  authorize([UniqueValues.CLIENT, UniqueValues.DIETITIAN]),
  asyncMiddleware(getSingleRequestedServiceController)
);
export default router;
