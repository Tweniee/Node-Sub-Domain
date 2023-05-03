import { expressRouter } from "../../Dependencies";
import { loginController } from "../../Controller/Users/Login.controller";
import { asyncMiddleware } from "../../Middleware/AsyncMiddleware";

const router = expressRouter();

//* <------------------------------------for Login User------------------------------------------------->
router.post("/", asyncMiddleware(loginController));

export default router;
