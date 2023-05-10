import { getAllUsersController, getUserByUserIdController } from "../../Controller/Users/Users.controller";
import { expressRouter } from "../../Dependencies";
import { asyncMiddleware } from "../../Middleware/AsyncMiddleware";

const router = expressRouter();


// * <---------------------Get All Registered Users--------------------------->
router.get("/getAll",asyncMiddleware(getAllUsersController))


// * <---------------------Get Single Registered Users--------------------------->
router.get("/getAll/:userId",asyncMiddleware(getUserByUserIdController))
export default router;