import { Router } from "express";
import { loginController } from "../../Controller/Users/Login.controller";
import { asyncMiddleware } from "../../Middleware/AsyncMiddleware";

const router = Router();

//* <------------------------------------for Login User------------------------------------------------->
router.post("/", asyncMiddleware(loginController));

export default router;
