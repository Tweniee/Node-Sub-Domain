import express from "express";
import { mainLayout } from "./mainLayout/mainLayout";
import "./Utils/db"
const app = express();
const PORT = 5000;

//Main Function to start app
mainLayout(app);

app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});
