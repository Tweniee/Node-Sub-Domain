import { Router } from "express";
import { loginUserController } from "../../Controller/Users/Login.controller";

const router = Router();

// <------------------------------------for Login User------------------------------------------------->
router.post("/", loginUserController);

export default router;
