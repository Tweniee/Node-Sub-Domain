import express from "express";
import { mainLayout } from "./mainLayout/mainLayout";
import "./Utils/db";
import { MAIN_PORT } from "./Config";
const app = express();
const PORT = Number(MAIN_PORT) | 5000;

//*Main Function to start app
mainLayout(app);

app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});
