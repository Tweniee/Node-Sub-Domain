import { Application } from "express";
import { loginRoute } from "../Routes/Index";

export const mainLayout = (app:Application)=>{
    app.use("/userLogin",loginRoute)
}